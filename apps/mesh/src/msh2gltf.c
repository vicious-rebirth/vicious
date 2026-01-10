#include <vicious.h>

#include <stdio.h>

#define CGLTF_IMPLEMENTATION
#define CGLTF_WRITE_IMPLEMENTATION
#include <cgltf_write.h>

#include <linmath.h>

#define ARENA_SIZE 32 * 1024 * 1024
#define POOL_SIZE 8192

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

bool writeDynamicMesh(FILE *file, const DynamicMesh *mesh, bool isGLB) {
    // Allocate
    cgltf_data *doc = calloc(1, sizeof(*doc));

    doc->asset.version = "2.0";
    doc->asset.generator = "Vicious";

    doc->nodes = calloc(32 + mesh->helperPoints.count, sizeof(doc->nodes[0]));
    if (doc->nodes == NULL) return false;

    doc->scenes = calloc(1, sizeof(doc->scenes[0]));
    if (doc->scenes == NULL) return false;

    doc->materials_count = (sizeof(mesh->body.meshSections) / sizeof(mesh->body.meshSections[0]));
    doc->materials = calloc(doc->materials_count, sizeof(doc->materials[0]));
    if (doc->materials == NULL) return false;

    doc->skins = calloc(1, sizeof(doc->skins[0]));
    if (doc->skins == NULL) return false;

    doc->buffers = calloc(1, sizeof(doc->buffers[0]));
    if (doc->buffers == NULL) return false;

    cgltf_size inverseBindMatricesSize = mesh->helperPoints.count * sizeof(mat4x4);

    cgltf_buffer *buffer = &doc->buffers[doc->buffers_count++];
    buffer->name = "buffer";
    buffer->size = inverseBindMatricesSize;

    doc->bin = calloc(1, buffer->size);
    if (doc->bin == NULL) return false;

    doc->buffer_views = calloc(1, sizeof(doc->buffer_views[0]));
    if (doc->buffer_views == NULL) return false;

    doc->accessors = calloc(1, sizeof(doc->accessors[0]));
    if (doc->accessors == NULL) return false;

    // Main scene
    cgltf_scene* scene = &doc->scenes[doc->scenes_count++];

    // Root node
    cgltf_node *root = &doc->nodes[doc->nodes_count++];
    {
        // Rotate mesh to Z-up
        root->has_rotation = true;
        root->rotation[0] = 0.0f;
        root->rotation[1] = 0.0f;
        root->rotation[2] = 1.0f;
        root->rotation[3] = 1.0f;

        // Attach to scene
        scene->nodes = realloc(scene->nodes, sizeof(scene->nodes[0]) * (scene->nodes_count + 1));
        if (scene->nodes == NULL) return false;

        scene->nodes[scene->nodes_count++] = root;
    }

    // Default materials (override with MaterialSet)
    {
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
    }

    // Skin / skeleton
    cgltf_skin *skin = &doc->skins[doc->skins_count++];
    {
        skin->skeleton = root;

        // Create joints
        skin->joints_count = mesh->helperPoints.count;
        skin->joints = calloc(skin->joints_count, sizeof(skin->joints[0]));

        cgltf_size inverseBindMatricesOffset = doc->bin_size;
        mat4x4 *inverseBindMatrices = (mat4x4 *)(doc->bin + inverseBindMatricesOffset);
        doc->bin_size += inverseBindMatricesSize;

        for (uint32_t i = 0; i < mesh->helperPoints.count; i++) {
            const DynamicMeshHelperPoint *pnt = &mesh->helperPoints.list[i];

            cgltf_node *j = &doc->nodes[doc->nodes_count++];
            mat4x4 *jm = &inverseBindMatrices[i];

            j->name = (char*)pnt->label.buffer.data;

            // Get data
            const Vector3 *p = &pnt->transform.position;
            const Rotation3 *r3 = &pnt->transform.rotation;
            mat4x4 t = {
                {r3->r00, r3->r01, r3->r02, 0},
                {r3->r10, r3->r11, r3->r12, 0},
                {r3->r20, r3->r21, r3->r22, 0},
                {p->x, p->y, p->z, 1}
            };

            // Set matrix
            j->has_matrix = true;
            for (uint8_t col = 0; col < 4; ++col) {
                for (uint8_t row = 0; row < 4; ++row) {
                    j->matrix[col * 4 + row] = t[col][row];
                }
            }

            // Set bind matrix
            mat4x4_invert(*jm, t);
            if (pnt->parentIndex >= 0) mat4x4_mul(*jm, *jm, inverseBindMatrices[pnt->parentIndex]); 
            
            // Attach to skin
            skin->joints[i] = j;

            // Attach to tree
            cgltf_node *parent;
            if (pnt->parentIndex >= 0) parent = skin->joints[pnt->parentIndex];
            else {
                root->name = (char *)pnt->label.buffer.data;
                parent = root;
            }

            parent->children = realloc(parent->children, sizeof(parent->children[0]) * (parent->children_count + 1));
            parent->children[parent->children_count++] = j;
        }

        // Set inverse bind matrices

        cgltf_buffer_view *bufferView = &doc->buffer_views[doc->buffer_views_count++];

        bufferView->name = "inverse_bind";
        bufferView->buffer = buffer;
        bufferView->offset = inverseBindMatricesOffset;
        bufferView->size = buffer->size;
        bufferView->stride = sizeof(mat4x4);
        bufferView->type = cgltf_buffer_view_type_vertices;

        cgltf_accessor *accessor = &doc->accessors[doc->accessors_count++];

        accessor->name = "inverse_bind";
        accessor->buffer_view = bufferView;
        accessor->count = skin->joints_count;
        accessor->component_type = cgltf_component_type_r_32f;
        accessor->type = cgltf_type_mat4;

        skin->inverse_bind_matrices = accessor;
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
