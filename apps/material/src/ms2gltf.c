#include <vicious.h>

#include <stdio.h>

#define CGLTF_IMPLEMENTATION
#define CGLTF_WRITE_IMPLEMENTATION
#include <cgltf_write.h>

#define ARENA_SIZE 32 * 1024 * 1024
#define POOL_SIZE 8192

const char *materialSearchFormats[] = {
    "%s_%08X%08X.glb",
    "Materials/%s_%08X%08X.glb",
    "Out/Materials/%s_%08X%08X.glb",
    "../Materials/%s_%08X%08X.glb",
    "../Out/Materials/%s_%08X%08X.glb",
    "%s.glb",
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

bool writeMaterialSet(FILE *file, MaterialSet *materialSet) {
    // Files

    char pathBuffer[1024];

    size_t count = materialSet->base.materials.base.count;
    cgltf_data **docs = calloc(count, sizeof(docs[0]));

    for (size_t i = 0; i < count; i++) {
        const AssetReference *ref = &materialSet->base.materials.base.list[i];

        FILE *file = NULL;
        for (size_t i = 0; i < sizeof(materialSearchFormats) / sizeof(materialSearchFormats[0]); i++) {
            const char *format = materialSearchFormats[i];

            sprintf(
                pathBuffer,
                format,
                ref->label.buffer.data,
                ref->id.low,
                ref->id.high
            );

            file = fopen(pathBuffer, "rb");
            if (file) break;
        }
        if (!file) return false;

        fseek(file, 0, SEEK_END);
        size_t size = ftell(file);
        fseek(file, 0, SEEK_SET);

        void *data = malloc(size);
        if (data == NULL) return false;

        fread(data, 1, size, file);

        fclose(file);

        cgltf_options opts = { 0 };

        cgltf_result result = cgltf_parse(&opts, data, size, &docs[i]);
        if (result != cgltf_result_success) return false;
    }

    // Allocate

    cgltf_data *doc = calloc(1, sizeof(*doc));
    if (doc == NULL) return false;

    doc->asset.version = "2.0";
    doc->asset.generator = "Vicious";

    size_t binSize = 0;
    size_t buffersCount = 0;
    size_t bufferViewsCount = 0;
    size_t texturesCount = 0;
    size_t imagesCount = 0;
    size_t materialsCount = 0;
    for (size_t i = 0; i < count; i++) {
        cgltf_data *d = docs[i];

        binSize += d->bin_size;
        buffersCount += d->buffers_count;
        bufferViewsCount += d->buffer_views_count;
        texturesCount += d->textures_count;
        imagesCount += d->images_count;
        materialsCount += 1;
    }

    void *bin = malloc(binSize);
    if (bin == NULL) return false;
    doc->bin = bin;

    doc->samplers_count = 1;
    doc->samplers = calloc(doc->samplers_count, sizeof(doc->samplers[0]));

    cgltf_sampler *sampler = &doc->samplers[0];

    sampler->name = "sampler";
    sampler->min_filter = cgltf_filter_type_linear;
    sampler->mag_filter = cgltf_filter_type_linear;
    sampler->wrap_s = cgltf_wrap_mode_repeat;
    sampler->wrap_t = cgltf_wrap_mode_repeat;

    doc->buffers_count = 1;
    doc->buffers = calloc(1, sizeof(doc->buffers[0]));

    cgltf_buffer *buffer = &doc->buffers[0];

    buffer->name = "buffer";
    buffer->size = binSize;

    doc->buffer_views = calloc(bufferViewsCount, sizeof(doc->buffer_views[0]));
    doc->images = calloc(imagesCount, sizeof(doc->images[0]));
    doc->textures = calloc(texturesCount, sizeof(doc->textures[0]));
    doc->materials = calloc(materialsCount, sizeof(doc->materials[0]));

    // Merge

    for (size_t i = 0; i < count; i++) {
        cgltf_data *d = docs[i];

        size_t bufferOffset = doc->bin_size;
        memcpy(bin + bufferOffset, d->bin, d->bin_size);
        doc->bin_size += d->bin_size;

        size_t bufferViewOffset = doc->buffer_views_count;
        for (size_t j = 0; j < d->buffer_views_count; j++) {
            cgltf_buffer_view *bv = &doc->buffer_views[bufferViewOffset + j];
            *bv = d->buffer_views[j];

            bv->buffer = &doc->buffers[0];
            bv->offset += bufferOffset;
        }
        doc->buffer_views_count += d->buffer_views_count;

        size_t imageOffset = doc->images_count;
        for (size_t j = 0; j < d->images_count; j++) {
            cgltf_image *img = &doc->images[imageOffset + j];
            *img = d->images[j];

            img->buffer_view = &doc->buffer_views[bufferViewOffset + (((size_t)img->buffer_view - (size_t)d->buffer_views) / sizeof(d->buffer_views[0]))];
        }
        doc->images_count += d->images_count;

        size_t textureOffset = doc->textures_count;
        for (size_t j = 0; j < d->textures_count; j++) {
            cgltf_texture *tex = &doc->textures[textureOffset + j];
            *tex = d->textures[j];

            tex->sampler = sampler;
            tex->image = &doc->images[imageOffset + (((size_t)tex->image - (size_t)d->images) / sizeof(d->images[0]))];
        }
        doc->textures_count += d->textures_count;

        size_t materialOffset = doc->materials_count;
        for (size_t j = 0; j < 1; j++) {
            cgltf_material *mat = &doc->materials[materialOffset + j];
            *mat = d->materials[j];

            if (mat->has_pbr_metallic_roughness) {
                cgltf_texture **tex = &mat->pbr_metallic_roughness.base_color_texture.texture;

                if (*tex) {
                    *tex = &doc->textures[textureOffset + (((size_t)*tex - (size_t)d->textures) / sizeof(d->textures[0]))];
                }
            }
        }
        doc->materials_count += 1;
    }

    // Write

    bool success = writeGLB(file, doc);

    // Clean up

    for (size_t i = 0; i < count; i++) {
        cgltf_free(docs[i]);
    }

    return success;
}

bool writeMaterialSetImpl(FILE *file, MaterialSetImpl *materialSet) {
    return writeMaterialSet(file, &materialSet->base);
}

int main(int argc, char **argv) {
    int result = 0;

    FILE *msFile = NULL;
    FILE *gltfFile = NULL;
    Arena arena = { 0 };
    AssetPool pool = { 0 };

    if (argc < 2) goto usage;

    const char *msPath = argv[1];

    msFile = fopen(msPath, "rb");
    if (msFile == NULL) goto error;

    if (!poolNew(&pool, POOL_SIZE)) goto error;
    if (!arenaNew(&arena, ARENA_SIZE)) goto error;

    StdDecoder decoder;
    stdDecoder(&decoder, msFile, &pool, &arena);

    AssetFile assetFile;
    decodeAssetFile((DecoderContext *)&decoder, &assetFile);

    void *asset = assetFile.content.asset;
    uint32_t assetType = assetFile.content.header.type;

    const char *gltfPath = argc > 2 ? argv[2] : "out.glb";

    gltfFile = fopen(gltfPath, "wb");
    if (gltfFile == NULL) goto error;

    switch (assetType) {
        case VCS_MaterialSet: if (!writeMaterialSet(gltfFile, asset)) goto error; break; 
        case VCS_MaterialSetImpl: if (!writeMaterialSetImpl(gltfFile, asset)) goto error; break;
        default: goto error;
    }

    goto cleanup;

usage:
    fprintf(stderr, "usage: %s ms_path [gltf_path]\n", argv[0]);

error:
    result = 1;

cleanup:
    arenaDestroy(&arena);
    poolDestroy(&pool);

    if (gltfFile != NULL) fclose(gltfFile);
    if (msFile != NULL) fclose(msFile);

    return result;
}
