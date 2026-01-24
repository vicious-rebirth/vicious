#include <vicious.h>

#include <stdio.h>

#define CGLTF_IMPLEMENTATION
#define CGLTF_WRITE_IMPLEMENTATION
#include <cgltf_write.h>

#define ARENA_SIZE 32 * 1024 * 1024
#define POOL_SIZE 8192

const char *textureSearchFormats[] = {
    "%s_%08X%08X.png",
    "Textures/%s_%08X%08X.png",
    "Out/Textures/%s_%08X%08X.png",
    "../Textures/%s_%08X%08X.png",
    "../Out/Textures/%s_%08X%08X.png",
    "%s.png",
};

bool writeGLB(FILE *file, cgltf_data *doc) {
    cgltf_options opts = { 0 };

    cgltf_size expected = cgltf_write(&opts, NULL, 0, doc);

    char *json = malloc(expected);
    if (json == NULL) return false;

    cgltf_size actual = cgltf_write(&opts, json, expected, doc);

    cgltf_write_glb(file, json, actual - 1, doc->bin, doc->bin_size);

    free(json);

    return true;
}

bool writeMaterialTexture(FILE *file, const char *name, const Color *tint, const AssetReference *albedoReference) {
    // Counts

    size_t textureCount = (albedoReference ? 1 : 0);

    // File

    char pathBuffer[1024];

    FILE *albedoFile = NULL;
    size_t albedoSize = 0;
    if (albedoReference) {
        for (size_t i = 0; i < sizeof(textureSearchFormats) / sizeof(textureSearchFormats[0]); i++) {
            const char *format = textureSearchFormats[i];

            sprintf(
                pathBuffer,
                format,
                albedoReference->label.buffer.data,
                albedoReference->id.low,
                albedoReference->id.high
            );

            albedoFile = fopen(pathBuffer, "rb");
            if (albedoFile) break;
        }
        if (!albedoFile) return false;

        fseek(albedoFile, 0, SEEK_END);
        albedoSize = ftell(albedoFile);
        fseek(albedoFile, 0, SEEK_SET);
    }

    // Allocate

    cgltf_data *doc = calloc(1, sizeof(*doc));

    doc->asset.version = "2.0";
    doc->asset.generator = "Vicious";

    size_t binSize = albedoSize;
    void *bin = calloc(binSize, 1);
    if (bin == NULL) return false;

    doc->bin = bin;

    doc->samplers_count = 1;
    doc->samplers = calloc(doc->samplers_count, sizeof(doc->samplers[0]));

    cgltf_sampler *sampler = &doc->samplers[0];

    sampler->name = "sampler";
    sampler->min_filter = cgltf_filter_type_linear;
    sampler->mag_filter = cgltf_filter_type_linear;
    sampler->wrap_s = cgltf_wrap_mode_clamp_to_edge;
    sampler->wrap_t = cgltf_wrap_mode_clamp_to_edge;

    doc->buffers_count = 1;
    doc->buffers = calloc(1, sizeof(doc->buffers[0]));

    cgltf_buffer *buffer = &doc->buffers[0];

    buffer->name = "buffer";
    buffer->size = binSize;

    doc->buffer_views = calloc(textureCount, sizeof(doc->buffer_views[0]));
    doc->images = calloc(textureCount, sizeof(doc->images[0]));
    doc->textures = calloc(textureCount, sizeof(doc->textures[0]));

    doc->materials_count = 1;
    doc->materials = calloc(1, sizeof(doc->materials[0]));

    // Texture

    cgltf_texture *albedo = NULL;
    if (albedoReference) {
        size_t bufferOffset = doc->bin_size;
        doc->bin_size += albedoSize;

        fread(bin + bufferOffset, 1, albedoSize, albedoFile);

        cgltf_buffer_view *bv = &doc->buffer_views[doc->buffer_views_count++];

        bv->name = "albedo";
        bv->buffer = buffer;
        bv->offset = bufferOffset;
        bv->size = albedoSize;

        cgltf_image *img = &doc->images[doc->images_count++];

        img->name = "albedo";
        img->buffer_view = bv;
        img->mime_type = "image/png";

        albedo = &doc->textures[doc->textures_count++];

        albedo->name = "albedo";
        albedo->image = img;
        albedo->sampler = sampler;
    }

    // Material

    cgltf_material *mat = &doc->materials[0];

    mat->name = (char *)name;

    mat->double_sided = true;

    mat->has_pbr_metallic_roughness = true;
    cgltf_pbr_metallic_roughness *pbr = &mat->pbr_metallic_roughness;

    pbr->base_color_factor[0] = (float)tint->r / 255.0f;
    pbr->base_color_factor[1] = (float)tint->g / 255.0f;
    pbr->base_color_factor[2] = (float)tint->b / 255.0f;
    pbr->base_color_factor[3] = (float)tint->a / 255.0f;

    if (albedo) {
        pbr->base_color_texture.texture = albedo;
        pbr->base_color_texture.scale = 1.0f;
    }

    return writeGLB(file, doc);
}

bool writeSpriteMaterial(FILE *file, const SpriteMaterial *material) {
    return writeMaterialTexture(
        file,
        (const char *)material->base.base.base.base.label.buffer.data,
        &material->base.tint,
        &material->albedo
    );
}

bool writeV27(FILE *file, const V27 *material) {
    return writeMaterialTexture(
        file,
        (const char *)material->base.base.base.base.base.label.buffer.data,
        &material->base.tint,
        &material->albedo
    );
}

bool writeV51(FILE *file, const V51 *material) {
    return writeMaterialTexture(
        file,
        (const char *)material->base.base.base.base.base.label.buffer.data,
        &material->base.tint,
        &material->albedo
    );
}

bool writeV73(FILE *file, const V73 *material) {
    return writeMaterialTexture(
        file,
        (const char *)material->base.base.base.base.base.label.buffer.data,
        &material->base.tint,
        &material->albedo
    );
}

bool writeV94(FILE *file, const V94 *material) {
    // Lighthing?
    return writeMaterialTexture(
        file,
        (const char *)material->base.base.base.base.base.label.buffer.data,
        &material->base.tint,
        &material->albedo
    );
}

bool writeV96(FILE *file, const V96 *material) {
    // Lighthing?
    return writeMaterialTexture(
        file,
        (const char *)material->base.base.base.base.base.label.buffer.data,
        &material->base.tint,
        NULL
    );
}

bool writeV287(FILE *file, const V287 *material) {
    // Lighthing?
    return writeMaterialTexture(
        file,
        (const char *)material->base.base.base.base.base.label.buffer.data,
        &material->base.tint,
        NULL
    );
}

bool writeV298(FILE *file, const V298 *material) {
    // Lighthing?
    return writeMaterialTexture(
        file,
        (const char *)material->base.base.base.base.base.label.buffer.data,
        &material->base.tint,
        NULL
    );
}

int main(int argc, char **argv) {
    int result = 0;

    FILE *mtlFile = NULL;
    FILE *gltfFile = NULL;
    Arena arena = { 0 };
    AssetPool pool = { 0 };

    if (argc < 2) goto usage;

    const char *mtlPath = argv[1];

    mtlFile = fopen(mtlPath, "rb");
    if (mtlFile == NULL) goto error;

    if (!poolNew(&pool, POOL_SIZE)) goto error;
    if (!arenaNew(&arena, ARENA_SIZE)) goto error;

    StdDecoder decoder;
    stdDecoder(&decoder, mtlFile, &pool, &arena);

    AssetFile assetFile;
    decodeAssetFile((DecoderContext *)&decoder, &assetFile);

    void *asset = assetFile.content.asset;
    uint32_t assetType = assetFile.content.header.type;

    const char *gltfPath = argc > 2 ? argv[2] : "out.glb";

    gltfFile = fopen(gltfPath, "wb");
    if (gltfFile == NULL) goto error;

    switch (assetType) {
        case VCS_SpriteMaterial: if (!writeSpriteMaterial(gltfFile, asset)) goto error; break;
        case VCS_V27: if (!writeV27(gltfFile, asset)) goto error; break;
        case VCS_V51: if (!writeV51(gltfFile, asset)) goto error; break;
        case VCS_V73: if (!writeV73(gltfFile, asset)) goto error; break;
        case VCS_V94: if (!writeV94(gltfFile, asset)) goto error; break;
        case VCS_V96: if (!writeV96(gltfFile, asset)) goto error; break;
        case VCS_V287: if (!writeV287(gltfFile, asset)) goto error; break;
        case VCS_V298: if (!writeV298(gltfFile, asset)) goto error; break;
        default: goto error;
    }

    goto cleanup;

usage:
    fprintf(stderr, "usage: %s mtl_path [gltf_path]\n", argv[0]);

error:
    result = 1;

cleanup:
    arenaDestroy(&arena);
    poolDestroy(&pool);

    if (gltfFile != NULL) fclose(gltfFile);
    if (mtlFile != NULL) fclose(mtlFile);

    return result;
}
