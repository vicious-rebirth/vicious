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
} VertexGLTF;

typedef VertexGLTF VertexF32;

typedef struct __attribute__((packed)) {
    int16_t x, y, z, nx, ny, nz, u, v;
} VertexI16;

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

    cgltf_size jointCount = mesh->helperPoints.count;
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
    doc->nodes = calloc(1 + jointCount + riggedMeshCount + staticMeshCount, sizeof(doc->nodes[0]));
    if (doc->nodes == NULL) return false;

    doc->scenes = calloc(1, sizeof(doc->scenes[0]));
    if (doc->scenes == NULL) return false;

    cgltf_scene* scene = &doc->scenes[doc->scenes_count++];
    {
        // 1 skeleton + 1 per mesh
        scene->nodes = calloc(1 + riggedMeshCount + staticMeshCount, sizeof(scene->nodes[0]));
        if (scene->nodes == NULL) return false;
    }

    doc->materials_count = meshSectionCount;
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

    cgltf_size riggedVertexCount = mesh->body.riggedVertexBuffer.size / sizeof(VertexF32);
    cgltf_size riggedVertexBufferSize = riggedVertexCount * sizeof(VertexGLTF);
    buffer->size += riggedVertexBufferSize;

    cgltf_size staticVertexCount = mesh->body.staticVertexBuffer.size / sizeof(VertexI16);
    cgltf_size staticVertexBufferSize = staticVertexCount * sizeof(VertexGLTF);
    buffer->size += staticVertexBufferSize;

    cgltf_size riggedJointCount = mesh->body.riggedJointWeightBuffer.size / sizeof(JointWeightVicious);
    cgltf_size riggedJointBufferSize = riggedJointCount * sizeof(JointWeightGLTF);
    buffer->size += riggedJointBufferSize;

    cgltf_size staticJointCount = staticVertexCount;
    cgltf_size staticJointBufferSize = staticJointCount * sizeof(JointWeightGLTF);
    buffer->size += staticJointBufferSize;

    cgltf_size riggedIndexBufferSize = 0;
    cgltf_size staticIndexBufferSize = 0;
    for (uint8_t si = 0; si < meshSectionCount; si++) {
        const MeshSection *section = &mesh->body.meshSections[si];

        for (size_t ri = 0; ri < section->riggedRangeCount; ri++) {
            const MeshRange *range = &section->riggedRanges[ri];

            riggedIndexBufferSize += range->indexCount * sizeof(uint32_t);
        }

        for (size_t ri = 0; ri < section->staticRangeCount; ri++) {
            const MeshRange *range = &section->staticRanges[ri];

            staticIndexBufferSize += range->indexCount * sizeof(uint32_t);
        }
    }
    buffer->size += riggedIndexBufferSize;
    buffer->size += staticIndexBufferSize;

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
        {
            skeleton->name = (char *)mesh->base.base.base.label.buffer.data;

            // Rotate Z-up
            skeleton->has_rotation = true;
            skeleton->rotation[0] = -1;
            skeleton->rotation[1] = 0;
            skeleton->rotation[2] = 0;
            skeleton->rotation[3] = 1;
        }

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
            cgltf_node *parent = (pnt->parentIndex >= 0) ? skin->joints[pnt->parentIndex] : skeleton;

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
        VertexGLTF *vertexBuffer = (VertexGLTF *)(doc->bin + vertexBufferOffset);
        {
            // Bake verticies mapped to helper point position

            VertexF32 *inVertexBuffer = (VertexF32 *)mesh->body.riggedVertexBuffer.data;

            for (uint8_t si = 0; si < meshSectionCount; si++) {
                const MeshSection *section = &mesh->body.meshSections[si];

                size_t prev = 0;
                for (size_t ri = 0; ri < section->riggedRangeCount; ri++) {
                    const MeshRange *range = &section->riggedRanges[ri];

                    mat4 *m = &helperMatrices[range->helperPointIndex];

                    uint32_t off = range->vertexOffset + prev;
                    uint32_t count = range->vertexCount - prev;

                    for (size_t o = 0; o < count; o++) {
                        size_t i = off + o;

                        VertexF32 *iv = &inVertexBuffer[i];
                        VertexGLTF *v = &vertexBuffer[i];

                        vec4 t = {iv->x, iv->y, iv->z, 1.0f};
                        glm_mat4_mulv(*m, t, t);

                        v->x = t[0];
                        v->y = t[1];
                        v->z = t[2];

                        v->nx = iv->nx;
                        v->ny = iv->ny;
                        v->nz = iv->nz;

                        v->u = iv->u;
                        v->v = iv->v;
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
                const JointWeightVicious *ji = &joints[i];

                JointWeightGLTF *j = &jointBuffer[i];
                memset(j, 0, sizeof(JointWeightGLTF));

                j->joints[0] = ji->j0 + 1;
                j->joints[1] = ji->j1 + 1;

                j->weights[0] = (float)ji->w0 / 255.0f;
                j->weights[1] = (float)ji->w1 / 255.0f;
            }
        }

        // Create buffer viewers

        cgltf_buffer_view *vertexBufferView = &doc->buffer_views[doc->buffer_views_count++];

        vertexBufferView->name = "skin_vertices";
        vertexBufferView->buffer = buffer;
        vertexBufferView->offset = vertexBufferOffset;
        vertexBufferView->size = riggedVertexBufferSize;
        vertexBufferView->stride = sizeof(VertexGLTF);
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

        weightAccessor->name = "skin_weights";
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

                    uint16_t *inIndexBuffer = (uint16_t *)(mesh->body.indexBuffer.data + range->indexOffset * sizeof(uint16_t));

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

    // Static

    if (mesh->body.staticVertexBuffer.size > 0) {
        // Create buffers

        size_t vertexBufferOffset = alloc_bin(staticVertexBufferSize);
        VertexGLTF *vertexBuffer = (VertexGLTF *)(doc->bin + vertexBufferOffset);
        {
            // Bake verticies mapped to helper point position

            VertexI16 *inVertexBuffer = (VertexI16 *)mesh->body.staticVertexBuffer.data;

            for (uint8_t si = 0; si < meshSectionCount; si++) {
                const MeshSection *section = &mesh->body.meshSections[si];

                size_t prev = 0;
                for (size_t ri = 0; ri < section->staticRangeCount; ri++) {
                    const MeshRange *range = &section->staticRanges[ri];

                    mat4 *m = &helperMatrices[range->helperPointIndex];

                    uint32_t off = range->vertexOffset + prev;
                    uint32_t count = range->vertexCount - prev;

                    for (size_t o = 0; o < count; o++) {
                        size_t i = off + o;

                        VertexI16 *iv = &inVertexBuffer[i];
                        VertexGLTF *v = &vertexBuffer[i];

                        vec4 t = {
                            (float)iv->x * mesh->base.inverseScale,
                            (float)iv->y * mesh->base.inverseScale,
                            (float)iv->z * mesh->base.inverseScale,
                            1.0f
                        };
                        glm_mat4_mulv(*m, t, t);

                        v->x = t[0];
                        v->y = t[1];
                        v->z = t[2];

                        v->nx = ((float)iv->nx / INT16_MAX);
                        v->ny = ((float)iv->ny / INT16_MAX);
                        v->nz = ((float)iv->nz / INT16_MAX);

                        v->u = (float)iv->u / 1024.0f;
                        v->v = (float)iv->v / 1024.0f;
                    }

                    prev = range->vertexCount;
                }
            }
        }

        size_t jointBufferOffset = alloc_bin(staticJointBufferSize);
        JointWeightGLTF *jointBuffer = (JointWeightGLTF *)(doc->bin + jointBufferOffset);
        {
            // Generated with mesh
            memset(jointBuffer, 0, staticJointBufferSize);
        }

        // Create buffer viewers

        cgltf_buffer_view *vertexBufferView = &doc->buffer_views[doc->buffer_views_count++];

        vertexBufferView->name = "static_vertices";
        vertexBufferView->buffer = buffer;
        vertexBufferView->offset = vertexBufferOffset;
        vertexBufferView->size = staticVertexBufferSize;
        vertexBufferView->stride = sizeof(VertexGLTF);
        vertexBufferView->type = cgltf_buffer_view_type_vertices;

        cgltf_buffer_view *jointBufferView = &doc->buffer_views[doc->buffer_views_count++];

        jointBufferView->name = "static_joints";
        jointBufferView->buffer = buffer;
        jointBufferView->offset = jointBufferOffset;
        jointBufferView->size = staticJointBufferSize;
        jointBufferView->stride = sizeof(JointWeightGLTF);
        jointBufferView->type = cgltf_buffer_view_type_vertices;

        // Create accessors

        cgltf_accessor *positionAccessor = &doc->accessors[doc->accessors_count++];

        positionAccessor->name = "static_position";
        positionAccessor->buffer_view = vertexBufferView;
        positionAccessor->offset = 0;
        positionAccessor->count = staticVertexCount;
        positionAccessor->component_type = cgltf_component_type_r_32f;
        positionAccessor->type = cgltf_type_vec3;

        cgltf_accessor *uvAccessor = &doc->accessors[doc->accessors_count++];

        uvAccessor->name = "static_uv";
        uvAccessor->buffer_view = vertexBufferView;
        uvAccessor->offset = 6 * sizeof(float);
        uvAccessor->count = staticVertexCount;
        uvAccessor->component_type = cgltf_component_type_r_32f;
        uvAccessor->type = cgltf_type_vec2;

        cgltf_accessor *jointAccessor = &doc->accessors[doc->accessors_count++];

        jointAccessor->name = "skin_joints";
        jointAccessor->buffer_view = jointBufferView;
        jointAccessor->offset = 0;
        jointAccessor->count = staticJointCount;
        jointAccessor->component_type = cgltf_component_type_r_8u;
        jointAccessor->type = cgltf_type_vec4;

        cgltf_accessor *weightAccessor = &doc->accessors[doc->accessors_count++];

        weightAccessor->name = "static_weights";
        weightAccessor->buffer_view = jointBufferView;
        weightAccessor->offset = 4;
        weightAccessor->count = staticJointCount;
        weightAccessor->component_type = cgltf_component_type_r_32f;
        weightAccessor->type = cgltf_type_vec4;

        // Create meshes

        for (uint32_t si = 0; si < meshSectionCount; si++) {
            const MeshSection *section = &mesh->body.meshSections[si];

            for (uint32_t ri = 0; ri < section->staticRangeCount; ri++) {
                const MeshRange *range = &section->staticRanges[ri];

                // Create index buffer + accessor

                size_t indexBufferSize = range->indexCount * sizeof(uint32_t);
                size_t indexBufferOffset = alloc_bin(indexBufferSize);
                uint32_t *indexBuffer = (uint32_t *)(doc->bin + indexBufferOffset);
                {
                    // Map from uint16_t to uint32_t and apply range transformation

                    uint16_t *inIndexBuffer = (uint16_t *)(mesh->body.indexBuffer.data + range->indexOffset * sizeof(uint16_t));

                    for (size_t i = 0; i < range->indexCount; i++) {
                        uint32_t idx = (uint32_t)inIndexBuffer[i] + range->vertexOffset;
                        indexBuffer[i] = idx;

                        // Set joint
                        jointBuffer[idx].joints[0] = range->helperPointIndex;
                        jointBuffer[idx].weights[0] = 1;
                    }
                }

                cgltf_buffer_view *indexBufferView = &doc->buffer_views[doc->buffer_views_count++];

                indexBufferView->name = "static_indices";
                indexBufferView->buffer = buffer;
                indexBufferView->offset = indexBufferOffset;
                indexBufferView->size = indexBufferSize;
                indexBufferView->type = cgltf_buffer_view_type_indices;

                cgltf_accessor *indexAccessor = &doc->accessors[doc->accessors_count++];

                indexAccessor->name = "static_index";
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

bool writeStaticMesh(FILE *file, const StaticMesh *mesh, bool isGLB) {
    // Allocate

    cgltf_data *doc = calloc(1, sizeof(*doc));

    doc->asset.version = "2.0";
    doc->asset.generator = "Vicious";

    cgltf_size meshCount = mesh->body.buffers.meshSections.count;
    doc->meshes = calloc(meshCount, sizeof(doc->meshes[0]));
    if (doc->meshes == NULL) return false;

    doc->nodes = calloc(1 + meshCount, sizeof(doc->nodes[0]));
    if (doc->nodes == NULL) return false;

    cgltf_node *root = &doc->nodes[doc->nodes_count++];
    {
        root->name = (char *)mesh->base.base.base.label.buffer.data;

        // Rotate Z-up
        root->has_rotation = true;
        root->rotation[0] = -1;
        root->rotation[1] = 0;
        root->rotation[2] = 0;
        root->rotation[3] = 1;

        root->children = calloc(meshCount, sizeof(root->children[0]));
        if (root->children == NULL) return false;
    }

    doc->scenes = calloc(1, sizeof(doc->scenes[0]));
    if (doc->scenes == NULL) return false;

    cgltf_scene* scene = &doc->scenes[doc->scenes_count++];
    {
        scene->nodes = calloc(1, sizeof(scene->nodes[0]));
        if (scene->nodes == NULL) return false;

        scene->nodes[scene->nodes_count++] = root;
    }

    doc->materials_count = 0;
    for (cgltf_size i = 0; i < mesh->body.buffers.meshSections.count; i++) {
        V20_8 *section = &mesh->body.buffers.meshSections.list[i];

        if (section->material + 1 > doc->materials_count) doc->materials_count = section->material + 1;
    }

    doc->materials = calloc(doc->materials_count, sizeof(doc->materials[0]));
    if (doc->materials == NULL) return false;

    doc->buffers = calloc(1, sizeof(doc->buffers[0]));
    if (doc->buffers == NULL) return false;

    cgltf_buffer *buffer = &doc->buffers[doc->buffers_count++];
    buffer->name = "buffer";
    buffer->size = 0;

    cgltf_size vertexCount = mesh->body.buffers.vertices.size / sizeof(VertexI16);
    cgltf_size vertexBufferSize = vertexCount * sizeof(VertexGLTF);
    buffer->size += vertexBufferSize;

    cgltf_size indexCount = mesh->body.buffers.indices.count;
    cgltf_size indexBufferSize = indexCount * sizeof(uint32_t);
    buffer->size += indexBufferSize;

    doc->bin = calloc(1, buffer->size);
    if (doc->bin == NULL) return false;

    // (1 vertex + 1 index) + 1 per mesh
    doc->buffer_views = calloc(2 + meshCount, sizeof(doc->buffer_views[0]));
    if (doc->buffer_views == NULL) return false;

    // (1 pos + 1 uv) + 1 per mesh
    doc->accessors = calloc(2 + meshCount, sizeof(doc->accessors[0]));
    if (doc->accessors == NULL) return false;

    // Materials (override with MaterialSet)

    for (uint8_t i = 0; i < doc->materials_count; i++) {
        cgltf_material *material = &doc->materials[i];

        material->double_sided = true;

        material->has_pbr_metallic_roughness = true;
        cgltf_pbr_metallic_roughness *pbr = &material->pbr_metallic_roughness;

        uint32_t color = (i < sizeof(uniqueColors) / sizeof(uniqueColors[0])) ? uniqueColors[i] : 0xFF00FF;
        pbr->base_color_factor[0] = ((color >> 16) & 0xFF) / 255.0f;
        pbr->base_color_factor[1] = ((color >>  8) & 0xFF) / 255.0f;
        pbr->base_color_factor[2] = ((color >>  0) & 0xFF) / 255.0f;
        pbr->base_color_factor[3] = 1.0f;

        pbr->metallic_factor = 0.5f;
        pbr->roughness_factor = 0.5f;
    }

    // Meshes

    cgltf_size vertexBufferOffset = alloc_bin(vertexBufferSize);
    VertexGLTF *vertexBuffer = (VertexGLTF *)(doc->bin + vertexBufferOffset);
    {
        // Map vertices

        VertexI16 *inVertexBuffer = (VertexI16 *)mesh->body.buffers.vertices.data;

        for (cgltf_size i = 0; i < vertexCount; i++) {
            VertexI16 *iv = &inVertexBuffer[i];
            VertexGLTF *v = &vertexBuffer[i];

            v->x = (float)iv->x * mesh->base.inverseScale;
            v->y = (float)iv->y * mesh->base.inverseScale;
            v->z = (float)iv->z * mesh->base.inverseScale;

            v->nx = (float)iv->nx / INT16_MAX;
            v->ny = (float)iv->ny / INT16_MAX;
            v->nz = (float)iv->nz / INT16_MAX;

            v->u = (float)iv->u / 1024.0f;
            v->v = (float)iv->v / 1024.0f;
        }
    }

    cgltf_size indexBufferOffset = alloc_bin(indexBufferSize);
    uint32_t *indexBuffer = (uint32_t *)(doc->bin + indexBufferOffset);
    {
        // Map indices

        uint16_t *inIndexBuffer = mesh->body.buffers.indices.data;

        for (cgltf_size i = 0; i < indexCount; i++) {
            indexBuffer[i] = inIndexBuffer[i];
        }
    }

    cgltf_buffer_view *vertexBufferView = &doc->buffer_views[doc->buffer_views_count++];

    vertexBufferView->name = "vertices";
    vertexBufferView->buffer = buffer;
    vertexBufferView->offset = vertexBufferOffset;
    vertexBufferView->size = vertexBufferSize;
    vertexBufferView->stride = sizeof(VertexGLTF);
    vertexBufferView->type = cgltf_buffer_view_type_vertices;

    cgltf_accessor *positionAccessor = &doc->accessors[doc->accessors_count++];

    positionAccessor->name = "position";
    positionAccessor->buffer_view = vertexBufferView;
    positionAccessor->offset = 0;
    positionAccessor->count = vertexCount;
    positionAccessor->component_type = cgltf_component_type_r_32f;
    positionAccessor->type = cgltf_type_vec3;

    cgltf_accessor *uvAccessor = &doc->accessors[doc->accessors_count++];

    uvAccessor->name = "uv";
    uvAccessor->buffer_view = vertexBufferView;
    uvAccessor->offset = 6 * sizeof(float);
    uvAccessor->count = vertexCount;
    uvAccessor->component_type = cgltf_component_type_r_32f;
    uvAccessor->type = cgltf_type_vec2;

    cgltf_size index = 0;
    for (cgltf_size i = 0; i < mesh->body.buffers.meshSections.count; i++) {
        V20_8 *section = &mesh->body.buffers.meshSections.list[i];

        // Create indices

        cgltf_size count = section->index;

        cgltf_buffer_view *indexBufferView = &doc->buffer_views[doc->buffer_views_count++];

        indexBufferView->name = "indices";
        indexBufferView->buffer = buffer;
        indexBufferView->offset = indexBufferOffset + index * sizeof(uint32_t);
        indexBufferView->size = count * sizeof(uint32_t);
        indexBufferView->type = cgltf_buffer_view_type_indices;

        cgltf_accessor *indexAccessor = &doc->accessors[doc->accessors_count++];

        indexAccessor->name = "index";
        indexAccessor->buffer_view = indexBufferView;
        indexAccessor->count = count;
        indexAccessor->component_type = cgltf_component_type_r_32u;
        indexAccessor->type = cgltf_type_scalar;

        index += count;

        // Create mesh

        cgltf_mesh *mesh = &doc->meshes[doc->meshes_count++];

        mesh->primitives_count = 1;

        mesh->primitives = calloc(mesh->primitives_count, sizeof(mesh->primitives[0]));
        if (mesh->primitives == NULL) return false;

        cgltf_primitive *primitive = &mesh->primitives[0];

        primitive->type = cgltf_primitive_type_triangle_strip;
        primitive->indices = indexAccessor;
        primitive->material = &doc->materials[section->material];

        primitive->attributes_count = 2;

        primitive->attributes = calloc(primitive->attributes_count, sizeof(primitive->attributes[0]));
        if (primitive->attributes == NULL) return false;

        primitive->attributes[0].name = "POSITION";
        primitive->attributes[0].type = cgltf_attribute_type_position;
        primitive->attributes[0].data = positionAccessor;

        primitive->attributes[1].name = "TEXCOORD_0";
        primitive->attributes[1].type = cgltf_attribute_type_texcoord;
        primitive->attributes[1].data = uvAccessor;

        // Create node

        cgltf_node *node = &doc->nodes[doc->nodes_count++];
        node->mesh = mesh;

        // Add to root

        root->children[root->children_count++] = node;
    }

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
        case VCS_DynamicMesh:
            if (!writeDynamicMesh(gltfFile, assetFile.content.asset, !isGLTF)) goto error;
            break;
        case VCS_StaticMesh:
            if (!writeStaticMesh(gltfFile, assetFile.content.asset, !isGLTF)) goto error;
            break;
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
