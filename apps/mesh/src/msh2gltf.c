#include "cglm/mat4.h"
#include <vicious.h>

#include <stdio.h>

#define CGLTF_IMPLEMENTATION
#define CGLTF_WRITE_IMPLEMENTATION
#include <cgltf_write.h>

#include <cglm/cglm.h>

#define ARENA_SIZE 32 * 1024 * 1024
#define POOL_SIZE 8192

typedef struct __attribute__((packed)) {
    float x, y, z, nx, ny, nz, u, v;
} RiggedVertex;

typedef struct {
    uint8_t j0, j1, w0, w1;
} JointWeightVicious;

typedef struct {
    uint8_t joints[4];
    float weights[4];
} JointWeightGLTF;

uint32_t uniqueColors[32] = {
    0xFFFF00, 0x0000FF, 0xFF0000, 0x00FF00,
    0x00FFFF, 0xFF00FF, 0xFFA500, 0x800080,
    0x32CD32, 0x008080, 0xA52A2A, 0xFF69B4,
    0x000080, 0x808000, 0x800000, 0x006400,
    0x87CEEB, 0xFFD700, 0xEE82EE, 0x40E0D0,
    0x228B22, 0xFF7F50, 0xD3D3D3, 0xA9A9A9,
    0xF5F5DC, 0xE6E6FA, 0xFFE5B4, 0x98FF98,
    0x6A5ACD, 0xDCAE96, 0xCD5C5C, 0x20B2AA
};

#define alloc_bin(sz) doc->bin_size; doc->bin_size += sz;

bool writeDynamicMesh(FILE *file, const DynamicMesh *mesh, bool isGLB) {
    // Allocate

    cgltf_data *doc = calloc(1, sizeof(*doc));

    doc->asset.version = "2.0";
    doc->asset.generator = "Vicious";

    size_t meshSectionCount = sizeof(mesh->body.meshSections) / sizeof(mesh->body.meshSections[0]);

    cgltf_size staticMeshCount = 0;
    cgltf_size riggedMeshCount = 0;
    for (uint8_t si = 0; si < meshSectionCount; si++) {
        const MeshSection *section = &mesh->body.meshSections[si];

        staticMeshCount += section->staticRangeCount;
        riggedMeshCount += section->riggedRangeCount;
    }

    doc->meshes = calloc(riggedMeshCount + staticMeshCount, sizeof(doc->meshes[0]));
    if (doc->meshes == NULL) return false;

    // 1 skeleton + 1 per skeleton joint + 1 per mesh 
    doc->nodes = calloc(1 + mesh->helperPoints.count + riggedMeshCount + staticMeshCount, sizeof(doc->nodes[0]));
    if (doc->nodes == NULL) return false;

    doc->scenes = calloc(1, sizeof(doc->scenes[0]));
    if (doc->scenes == NULL) return false;

    cgltf_scene* scene = &doc->scenes[doc->scenes_count++];
    {
        // 1 skeleton + 1 per mesh
        scene->nodes = calloc(1 + riggedMeshCount + staticMeshCount, sizeof(scene->nodes[0]));
        if (scene->nodes == NULL) return false;
    }

    doc->materials_count = (meshSectionCount);
    doc->materials = calloc(doc->materials_count, sizeof(doc->materials[0]));
    if (doc->materials == NULL) return false;

    doc->skins = calloc(1, sizeof(doc->skins[0]));
    if (doc->skins == NULL) return false;

    doc->buffers = calloc(1, sizeof(doc->buffers[0]));
    if (doc->buffers == NULL) return false;

    cgltf_buffer *buffer = &doc->buffers[doc->buffers_count++];
    buffer->name = "buffer";
    buffer->size = 0;

    cgltf_size inverseBindMatricesSize = mesh->helperPoints.count * sizeof(mat4);
    buffer->size += inverseBindMatricesSize;

    uint32_t riggedVertexCount = mesh->body.riggedVertexBuffer.size / sizeof(RiggedVertex);
    cgltf_size riggedVertexBufferSize = mesh->body.riggedVertexBuffer.size;
    buffer->size += riggedVertexBufferSize;

    uint32_t riggedJointCount = mesh->body.riggedJointWeightBuffer.size / sizeof(JointWeightVicious);
    cgltf_size riggedJointBufferSize = riggedJointCount * sizeof(JointWeightGLTF);
    buffer->size += riggedJointBufferSize;

    cgltf_size riggedIndexBufferSize = 0;
    if (riggedVertexBufferSize > 0) {
        for (uint8_t si = 0; si < meshSectionCount; si++) {
            const MeshSection *section = &mesh->body.meshSections[si];

            for (size_t ri = 0; ri < section->riggedRangeCount; ri++) {
                const MeshRange *range = &section->riggedRanges[ri];

                riggedIndexBufferSize += range->indexCount * sizeof(uint32_t);
            }
        }
    }
    buffer->size += riggedIndexBufferSize;

    doc->bin = calloc(1, buffer->size);
    if (doc->bin == NULL) return false;

    // (1 skeleton + 2 static + 2 rigged) + 1 per mesh
    doc->buffer_views = calloc(5 + riggedMeshCount + staticMeshCount, sizeof(doc->buffer_views[0]));
    if (doc->buffer_views == NULL) return false;

    // (1 skeleton + 4 static + 4 rigged) + 1 per mesh
    doc->accessors = calloc(9 + riggedMeshCount + staticMeshCount, sizeof(doc->accessors[0]));
    if (doc->accessors == NULL) return false;

    // Materials (override with MaterialSet)

    for (uint8_t i = 0; i < doc->materials_count; i++) {
        cgltf_material *material = &doc->materials[i];

        material->double_sided = true;

        material->has_pbr_metallic_roughness = true;
        cgltf_pbr_metallic_roughness *pbr = &material->pbr_metallic_roughness;

        uint32_t color = uniqueColors[i];
        pbr->base_color_factor[0] = ((color >> 16) & 0xFF) / 255.0f;
        pbr->base_color_factor[1] = ((color >>  8) & 0xFF) / 255.0f;
        pbr->base_color_factor[2] = ((color >>  0) & 0xFF) / 255.0f;
        pbr->base_color_factor[3] = 1.0f;

        pbr->metallic_factor = 0.5f;
        pbr->roughness_factor = 0.5f;
    }

    // Skeleton

    cgltf_skin *skin = &doc->skins[doc->skins_count++];
    {
        cgltf_node *skeleton = &doc->nodes[doc->nodes_count++];

        skin->skeleton = skeleton;
        scene->nodes[scene->nodes_count++] = skeleton;

        // Create joints
        skin->joints_count = mesh->helperPoints.count;
        skin->joints = calloc(skin->joints_count, sizeof(skin->joints[0]));

        cgltf_size inverseBindMatricesOffset = alloc_bin(inverseBindMatricesSize);
        mat4 *inverseBindMatrices = (mat4 *)(doc->bin + inverseBindMatricesOffset);

        for (uint32_t i = 0; i < mesh->helperPoints.count; i++) {
            const DynamicMeshHelperPoint *pnt = &mesh->helperPoints.list[i];

            cgltf_node *j = &doc->nodes[doc->nodes_count++];
            mat4 *jm = &inverseBindMatrices[i];

            j->name = (char*)pnt->label.buffer.data;

            // Get transform
            const Vector3 *p = &pnt->transform.position;
            const Rotation3 *r = &pnt->transform.rotation;
            mat4 t = {
                {r->r00, r->r10, r->r20, 0},
                {r->r01, r->r11, r->r21, 0},
                {r->r02, r->r12, r->r22, 0},
                {p->x, p->y, p->z, 1}
            };

            // Set translation
            j->has_translation = true;
            j->translation[0] = p->x;
            j->translation[1] = p->y;
            j->translation[2] = p->z;

            // Set rotation
            j->has_rotation = true;

            versor rq;
            glm_mat4_quat(t, rq);
            j->rotation[0] = rq[0];
            j->rotation[1] = rq[1];
            j->rotation[2] = rq[2];
            j->rotation[3] = rq[3];

            // Set bind matrix
            mat4 tI;
            glm_mat4_inv(t, tI);
            if (pnt->parentIndex >= 0) glm_mat4_mul(tI, inverseBindMatrices[pnt->parentIndex], tI);
            glm_mat4_copy(tI, *jm);

            // Attach to skin
            skin->joints[i] = j;

            // Attach to parent
            cgltf_node *parent;
            if (pnt->parentIndex >= 0) parent = skin->joints[pnt->parentIndex];
            else {
                parent = skeleton;
                parent->name = j->name;
            }

            parent->children = realloc(parent->children, sizeof(parent->children[0]) * (parent->children_count + 1));
            parent->children[parent->children_count++] = j;
        }

        // Set inverse bind matrices

        cgltf_buffer_view *bufferView = &doc->buffer_views[doc->buffer_views_count++];

        bufferView->name = "skeleton_matrices";
        bufferView->buffer = buffer;
        bufferView->offset = inverseBindMatricesOffset;
        bufferView->size = inverseBindMatricesSize;
        bufferView->stride = sizeof(mat4);
        bufferView->type = cgltf_buffer_view_type_vertices;

        cgltf_accessor *accessor = &doc->accessors[doc->accessors_count++];

        accessor->name = "skeleton_matrices";
        accessor->buffer_view = bufferView;
        accessor->count = skin->joints_count;
        accessor->component_type = cgltf_component_type_r_32f;
        accessor->type = cgltf_type_mat4;

        skin->inverse_bind_matrices = accessor;
    }

    // Helper point matrices

    mat4 *helperMatrices = calloc(mesh->helperPoints.count, sizeof(mat4));
    if (helperMatrices == NULL) return false;

    for (uint32_t i = 0; i < mesh->helperPoints.count; i++) {
        const DynamicMeshHelperPoint *pnt = &mesh->helperPoints.list[i];

        const Vector3 *p = &pnt->transform.position;
        const Rotation3 *r = &pnt->transform.rotation;
        mat4 t = {
            {r->r00, r->r10, r->r20, 0},
            {r->r01, r->r11, r->r21, 0},
            {r->r02, r->r12, r->r22, 0},
            {p->x, p->y, p->z, 1}
        };

        if (pnt->parentIndex >= 0) {
            glm_mat4_mul(helperMatrices[pnt->parentIndex], t, helperMatrices[i]);
        } else {
            glm_mat4_copy(t, helperMatrices[i]);
        }
    }

    // Skin

    if (mesh->body.riggedVertexBuffer.size > 0) {
        // Create buffers

        size_t vertexBufferOffset = alloc_bin(riggedVertexBufferSize);
        RiggedVertex *vertexBuffer = (RiggedVertex *)(doc->bin + vertexBufferOffset);
        {
            // Bake verticies mapped to helper point position

            memcpy(vertexBuffer, mesh->body.riggedVertexBuffer.data, mesh->body.riggedVertexBuffer.size);

            for (uint8_t si = 0; si < meshSectionCount; si++) {
                const MeshSection *section = &mesh->body.meshSections[si];

                size_t prev = 0;
                for (size_t ri = 0; ri < section->riggedRangeCount; ri++) {
                    const MeshRange *range = &section->riggedRanges[ri];

                    mat4 *m = &helperMatrices[range->helperPointIndex];

                    uint32_t off = range->vertexOffset + prev;
                    uint32_t count = range->vertexCount - prev;

                    for (size_t o = 0; o < count; o++) {
                        RiggedVertex *v = &vertexBuffer[off + o];

                        vec4 t = {v->x, v->y, v->z, 1.0f};
                        glm_mat4_mulv(*m, t, t);

                        v->x = t[0];
                        v->y = t[1];
                        v->z = t[2];
                    }

                    prev = range->vertexCount;
                }
            }
        }

        size_t jointBufferOffset = alloc_bin(riggedJointBufferSize);
        JointWeightGLTF *jointBuffer = (JointWeightGLTF *)(doc->bin + jointBufferOffset);
        {
            // Map joints to GLTF format

            const JointWeightVicious *joints = (JointWeightVicious *)mesh->body.riggedJointWeightBuffer.data;

            for (uint32_t i = 0; i < riggedJointCount; i++) {
                JointWeightGLTF *j = &jointBuffer[i];
                const JointWeightVicious *ji = &joints[i];

                j->joints[0] = ji->j0 + 1;
                j->joints[1] = ji->j1 + 1;
                j->joints[2] = 0;
                j->joints[3] = 0;

                j->weights[0] = (float)ji->w0 / 255.0f;
                j->weights[1] = (float)ji->w1 / 255.0f;
                j->weights[2] = 0.0f;
                j->weights[3] = 0.0f;
            }
        }

        // Create buffer viewers

        cgltf_buffer_view *vertexBufferView = &doc->buffer_views[doc->buffer_views_count++];

        vertexBufferView->name = "skin_vertices";
        vertexBufferView->buffer = buffer;
        vertexBufferView->offset = vertexBufferOffset;
        vertexBufferView->size = riggedVertexBufferSize;
        vertexBufferView->stride = sizeof(RiggedVertex);
        vertexBufferView->type = cgltf_buffer_view_type_vertices;

        cgltf_buffer_view *jointBufferView = &doc->buffer_views[doc->buffer_views_count++];

        jointBufferView->name = "skin_joints";
        jointBufferView->buffer = buffer;
        jointBufferView->offset = jointBufferOffset;
        jointBufferView->size = riggedJointBufferSize;
        jointBufferView->stride = sizeof(JointWeightGLTF);
        jointBufferView->type = cgltf_buffer_view_type_vertices;

        // Create accessors

        cgltf_accessor *positionAccessor = &doc->accessors[doc->accessors_count++];

        positionAccessor->name = "skin_position";
        positionAccessor->buffer_view = vertexBufferView;
        positionAccessor->offset = 0;
        positionAccessor->count = riggedVertexCount;
        positionAccessor->component_type = cgltf_component_type_r_32f;
        positionAccessor->type = cgltf_type_vec3;

        cgltf_accessor *uvAccessor = &doc->accessors[doc->accessors_count++];

        uvAccessor->name = "skin_uv";
        uvAccessor->buffer_view = vertexBufferView;
        uvAccessor->offset = 6 * sizeof(float);
        uvAccessor->count = riggedVertexCount;
        uvAccessor->component_type = cgltf_component_type_r_32f;
        uvAccessor->type = cgltf_type_vec2;

        cgltf_accessor *jointAccessor = &doc->accessors[doc->accessors_count++];

        jointAccessor->name = "skin_joints";
        jointAccessor->buffer_view = jointBufferView;
        jointAccessor->offset = 0;
        jointAccessor->count = riggedJointCount;
        jointAccessor->component_type = cgltf_component_type_r_8u;
        jointAccessor->type = cgltf_type_vec4;

        cgltf_accessor *weightAccessor = &doc->accessors[doc->accessors_count++];

        weightAccessor->name = "rigged_weights";
        weightAccessor->buffer_view = jointBufferView;
        weightAccessor->offset = 4;
        weightAccessor->count = riggedJointCount;
        weightAccessor->component_type = cgltf_component_type_r_32f;
        weightAccessor->type = cgltf_type_vec4;

        // Create meshes

        for (uint32_t si = 0; si < meshSectionCount; si++) {
            const MeshSection *section = &mesh->body.meshSections[si];

            for (uint32_t ri = 0; ri < section->riggedRangeCount; ri++) {
                const MeshRange *range = &section->riggedRanges[ri];

                // Create index buffer + accessor

                size_t indexBufferSize = range->indexCount * sizeof(uint32_t);
                size_t indexBufferOffset = alloc_bin(indexBufferSize);
                uint32_t *indexBuffer = (uint32_t *)(doc->bin + indexBufferOffset);
                {
                    // Map from uint16_t to uint32_t and apply range transformation

                    uint16_t *inIndexBuffer = (uint16_t *)(mesh->body.indexBuffer.data + range->indexOffset * 2);

                    for (size_t i = 0; i < range->indexCount; i++) {
                        indexBuffer[i] = (uint32_t)inIndexBuffer[i] + range->vertexOffset;
                    }
                }

                cgltf_buffer_view *indexBufferView = &doc->buffer_views[doc->buffer_views_count++];

                indexBufferView->name = "skin_indices";
                indexBufferView->buffer = buffer;
                indexBufferView->offset = indexBufferOffset;
                indexBufferView->size = indexBufferSize;
                indexBufferView->type = cgltf_buffer_view_type_indices;

                cgltf_accessor *indexAccessor = &doc->accessors[doc->accessors_count++];

                indexAccessor->name = "skin_index";
                indexAccessor->buffer_view = indexBufferView;
                indexAccessor->count = range->indexCount;
                indexAccessor->component_type = cgltf_component_type_r_32u;
                indexAccessor->type = cgltf_type_scalar;

                // Create mesh

                cgltf_mesh *mesh = &doc->meshes[doc->meshes_count++];

                mesh->primitives_count = 1;

                mesh->primitives = calloc(mesh->primitives_count, sizeof(mesh->primitives[0]));
                if (mesh->primitives == NULL) return false;

                cgltf_primitive *primitive = &mesh->primitives[0];

                primitive->type = cgltf_primitive_type_triangle_strip;
                primitive->indices = indexAccessor;
                primitive->material = &doc->materials[si];

                primitive->attributes_count = 4;

                primitive->attributes = calloc(primitive->attributes_count, sizeof(primitive->attributes[0]));
                if (primitive->attributes == NULL) return false;

                primitive->attributes[0].name = "POSITION";
                primitive->attributes[0].type = cgltf_attribute_type_position;
                primitive->attributes[0].data = positionAccessor;

                primitive->attributes[1].name = "TEXCOORD_0";
                primitive->attributes[1].type = cgltf_attribute_type_texcoord;
                primitive->attributes[1].data = uvAccessor;

                primitive->attributes[2].name = "JOINTS_0";
                primitive->attributes[2].type = cgltf_attribute_type_joints;
                primitive->attributes[2].data = jointAccessor;

                primitive->attributes[3].name = "WEIGHTS_0";
                primitive->attributes[3].type = cgltf_attribute_type_weights;
                primitive->attributes[3].data = weightAccessor;

                // Create node

                cgltf_node *node = &doc->nodes[doc->nodes_count++];
                node->mesh = mesh;
                node->skin = skin;

                // Add to scene

                scene->nodes[scene->nodes_count++] = node;
            }
        }
    }

    free(helperMatrices);

    // Write file

    cgltf_options opts = { 0 };

    cgltf_size expected = cgltf_write(&opts, NULL, 0, doc);

    char *json = malloc(expected);
    if (json == NULL) return false;

    cgltf_size actual = cgltf_write(&opts, json, expected, doc);

    if (isGLB) {
        cgltf_write_glb(file, json, actual - 1, doc->bin, doc->bin_size);
    } else {
        fwrite(json, 1, actual - 1, file);
    }

    free(json);

    return true;
}

int main(int argc, char **argv) {
    int result = 0;

    FILE *mshFile = NULL;
    FILE *gltfFile = NULL;
    Arena arena = { 0 };
    AssetPool pool = { 0 };

    if (argc < 2) goto usage;

    const char *mshPath = argv[1];

    mshFile = fopen(mshPath, "rb");
    if (mshFile == NULL) goto error;

    if (!poolNew(&pool, POOL_SIZE)) goto error;
    if (!arenaNew(&arena, ARENA_SIZE)) goto error;

    StdDecoder decoder;
    stdDecoder(&decoder, mshFile, &pool, &arena);

    AssetFile assetFile;
    decodeAssetFile((DecoderContext *)&decoder, &assetFile);

    void *asset = assetFile.content.asset;
    uint32_t assetType = assetFile.content.header.type;

    const char *gltfPath = argc > 2 ? argv[2] : "out.glb";

    gltfFile = fopen(gltfPath, "wb");
    if (gltfFile == NULL) goto error;

    size_t gltfPathSize = strlen(gltfPath);
    bool isGLTF = gltfPathSize > (sizeof(".gltf") - 1) && strcasecmp(gltfPath + gltfPathSize - (sizeof(".gltf") - 1), ".gltf") == 0;

    switch (assetType) {
        case VCS_DynamicMesh: {
            if (!writeDynamicMesh(gltfFile, assetFile.content.asset, !isGLTF)) goto error;
        } break;
        default: goto error;
    }

    goto cleanup;

usage:
    fprintf(stderr, "usage: %s msh_path [gltf_path]\n", argv[0]);

error:
    result = 1;

cleanup:
    arenaDestroy(&arena);
    poolDestroy(&pool);

    if (gltfFile != NULL) fclose(gltfFile);
    if (mshFile != NULL) fclose(mshFile);

    return result;
}
