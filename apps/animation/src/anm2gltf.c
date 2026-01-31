#include <vicious.h>

#include <stdio.h>

#define CGLTF_IMPLEMENTATION
#define CGLTF_WRITE_IMPLEMENTATION
#include <cgltf_write.h>

#define ARENA_SIZE 32 * 1024 * 1024
#define POOL_SIZE 8192

typedef struct __attribute__((packed)) {
    int16_t x, y, z;
} Vec3I16;

typedef struct __attribute__((packed)) {
    float x, y, z;
} Vec3F32;

typedef struct __attribute__((packed)) {
    int16_t x, y, z, w;
} Vec4I16;

typedef struct __attribute__((packed)) {
    float x, y, z, w;
} Vec4F32;

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

#define alloc_bin(sz) doc->bin_size; doc->bin_size += sz;

bool writeAnimation(FILE *file, Animation *animation) {
    // Allocate

    cgltf_data *doc = calloc(1, sizeof(*doc));
    if (doc == NULL) return false;

    doc->asset.version = "2.0";
    doc->asset.generator = "Vicious";

    doc->nodes_count = 1 + animation->jointFlagCount;
    doc->nodes = calloc(doc->nodes_count, sizeof(doc->nodes[0]));
    if (doc->nodes == NULL) return false;

    doc->scenes = calloc(1, sizeof(doc->scenes[0]));
    if (doc->scenes == NULL) return false;

    cgltf_scene* scene = &doc->scenes[doc->scenes_count++];
    {
        scene->nodes = calloc(doc->nodes_count, sizeof(scene->nodes[0]));
        if (scene->nodes == NULL) return false;

        for (size_t i = 0; i < doc->nodes_count; i++) {
            scene->nodes[i] = &doc->nodes[i];
        }
    }

    size_t frameCount = animation->frameCount;
    size_t translationCount = animation->positionIndices.count > 0 ? animation->positionIndices.count : animation->positionBuffer.size / sizeof(Vec3I16);
    size_t rotationCount = animation->rotationIndices.count > 0 ? animation->rotationIndices.count : animation->rotationBuffer.size / sizeof(Vec4I16); 
    size_t scaleCount = animation->scaleIndices.count > 0 ? animation->scaleIndices.count : animation->scaleBuffer.size / sizeof(Vec3I16);

    size_t timeSize = frameCount * sizeof(float);
    size_t translationSize = translationCount * sizeof(Vec3F32);
    size_t rotationSize = rotationCount * sizeof(Vec4F32);
    size_t scaleSize = scaleCount * sizeof(Vec3F32);
    size_t binSize = timeSize + translationSize + rotationSize + scaleSize;
    doc->bin = malloc(binSize);
    if (doc->bin == NULL) return false;

    size_t binOffset = 0;

    size_t timeOffset = alloc_bin(timeSize);
    {
        float timeDelta = (float)animation->rate / 500.0f;
        float timeStep = 0;

        float *out = (float *)(doc->bin + timeOffset);

        for (size_t i = 0; i < frameCount; i++) {
            out[i] = timeStep;
            timeStep += timeDelta;
        }
    }

    size_t translationOffset = alloc_bin(translationSize);
    {
        Vec3I16 *vertices = (Vec3I16 *)animation->positionBuffer.data;

        bool hasIndex = animation->positionIndices.count > 0;
        uint16_t *indices = (uint16_t *)animation->positionIndices.buffer.data;

        Vec3F32 *out = (Vec3F32 *)(doc->bin + translationOffset);

        for (size_t i = 0; i < translationCount; i++) {
            Vec3I16 *iv = &vertices[hasIndex ? indices[i] : i];
            Vec3F32 *ov = &out[i];

            ov->x = (float)iv->x * animation->positionScale;
            ov->y = (float)iv->y * animation->positionScale;
            ov->z = (float)iv->z * animation->positionScale;
        }
    }

    size_t rotationOffset = alloc_bin(rotationSize);
    {
        Vec4I16 *vertices = (Vec4I16 *)animation->rotationBuffer.data;

        bool hasIndex = animation->rotationIndices.count > 0;
        uint16_t *indices = (uint16_t *)animation->rotationIndices.buffer.data;

        Vec4F32 *out = (Vec4F32 *)(doc->bin + rotationOffset);

        for (size_t i = 0; i < rotationCount; i++) {
            Vec4I16 *iv = &vertices[hasIndex ? indices[i] : i];
            Vec4F32 *ov = &out[i];

            ov->x = (float)iv->x / 16384.0f;
            ov->y = (float)iv->y / 16384.0f;
            ov->z = (float)iv->z / 16384.0f;
            ov->w = (float)-iv->w / 16384.0f;
        }
    }

    size_t scaleOffset = alloc_bin(scaleSize);
    {
        Vec3I16 *vertices = (Vec3I16 *)animation->scaleBuffer.data;
        uint16_t *indices = (uint16_t *)animation->scaleIndices.buffer.data;

        bool hasIndex = animation->scaleIndices.count > 0;
        Vec3F32 *out = (Vec3F32 *)(doc->bin + scaleOffset);

        for (size_t i = 0; i < scaleCount; i++) {
            Vec3I16 *iv = &vertices[hasIndex ? indices[i] : i];
            Vec3F32 *ov = &out[i];

            ov->x = (float)iv->x * animation->scaleScale;
            ov->y = (float)iv->y * animation->scaleScale;
            ov->z = (float)iv->z * animation->scaleScale;
        }
    }

    doc->buffers_count = 1;
    doc->buffers = calloc(doc->buffers_count, sizeof(doc->buffers[0]));
    if (doc->buffers == NULL) return false;

    cgltf_buffer *buffer = &doc->buffers[0];

    buffer->name = "buffer";
    buffer->size = binSize;

    doc->buffer_views = calloc(1 + animation->jointFlagCount * 3, sizeof(doc->buffer_views[0]));
    if (doc->buffer_views == NULL) return false;

    cgltf_buffer_view *time = &doc->buffer_views[doc->buffer_views_count++];

    time->name = "time";
    time->buffer = buffer;
    time->offset = timeOffset;
    time->size = timeSize;
    time->type = cgltf_buffer_view_type_vertices;

    doc->accessors = calloc(2 + animation->jointFlagCount * 3, sizeof(doc->accessors[0]));
    if (doc->accessors == NULL) return false;

    cgltf_accessor *intervalTime = &doc->accessors[doc->accessors_count++];

    intervalTime->name = "interval_time";
    intervalTime->buffer_view = time;
    intervalTime->count = animation->frameCount;
    intervalTime->component_type = cgltf_component_type_r_32f;
    intervalTime->type = cgltf_type_scalar;

    cgltf_accessor *singleTime = &doc->accessors[doc->accessors_count++];

    singleTime->name = "single_time";
    singleTime->buffer_view = time;
    singleTime->count = 1;
    singleTime->component_type = cgltf_component_type_r_32f;
    singleTime->type = cgltf_type_scalar;

    doc->animations_count = 1;
    doc->animations = calloc(doc->animations_count, sizeof(doc->animations[0]));
    if (doc->animations == NULL) return false;

    cgltf_animation *anim = &doc->animations[0];

    anim->samplers = calloc(animation->jointFlagCount * 3, sizeof(anim->samplers[0]));
    if (anim->samplers == NULL) return false;

    anim->channels = calloc(animation->jointFlagCount * 3, sizeof(anim->channels[0]));
    if (anim->channels == NULL) return false;

    {
        size_t offset = translationOffset;

        for (size_t i = 0; i < animation->jointFlagCount; i++) {
            uint8_t flag = animation->jointFlags.data[i];
            if (flag == 0) continue;

            cgltf_node *node = &doc->nodes[i + 1];

            cgltf_buffer_view *bv = &doc->buffer_views[doc->buffer_views_count++];

            bv->name = "translation";
            bv->buffer = buffer;
            bv->type = cgltf_buffer_view_type_vertices;

            cgltf_accessor *accessor = &doc->accessors[doc->accessors_count++];

            accessor->name = "translation";
            accessor->buffer_view = bv;
            accessor->component_type = cgltf_component_type_r_32f;
            accessor->type = cgltf_type_vec3;

            cgltf_animation_sampler *sampler = &anim->samplers[anim->samplers_count++];

            sampler->output = accessor;

            size_t count;
            if (flag == 8 || flag == 9) {
                count = frameCount;
                sampler->input = intervalTime;
            } else {
                count = 1;
                sampler->input = singleTime;
            }

            size_t size = count * sizeof(Vec3F32);
            bv->offset = offset;
            bv->size = size;
            offset += size;

            accessor->count = count;

            cgltf_animation_channel *channel = &anim->channels[anim->channels_count++];

            channel->target_path = cgltf_animation_path_type_translation;
            channel->target_node = node;
            channel->sampler = sampler;
        }
    }

    {
        size_t offset = rotationOffset;

        for (size_t i = 0; i < animation->jointFlagCount; i++) {
            uint8_t flag = animation->jointFlags.data[i];
            if (flag == 0) continue;

            cgltf_node *node = &doc->nodes[i + 1];

            cgltf_buffer_view *bv = &doc->buffer_views[doc->buffer_views_count++];

            bv->name = "rotation";
            bv->buffer = buffer;
            bv->type = cgltf_buffer_view_type_vertices;

            cgltf_accessor *accessor = &doc->accessors[doc->accessors_count++];

            accessor->name = "rotation";
            accessor->buffer_view = bv;
            accessor->component_type = cgltf_component_type_r_32f;
            accessor->type = cgltf_type_vec4;

            cgltf_animation_sampler *sampler = &anim->samplers[anim->samplers_count++];

            sampler->output = accessor;

            size_t count;
            if (flag == 8 || flag == 10) {
                count = frameCount;
                sampler->input = intervalTime;
            } else {
                count = 1;
                sampler->input = singleTime;
            }

            size_t size = count * sizeof(Vec4F32);
            bv->offset = offset;
            bv->size = size;
            offset += size;

            accessor->count = count;

            cgltf_animation_channel *channel = &anim->channels[anim->channels_count++];

            channel->target_path = cgltf_animation_path_type_rotation;
            channel->target_node = node;
            channel->sampler = sampler;
        }
    }

    {
        size_t offset = scaleOffset;

        for (size_t i = 0; i < animation->jointFlagCount; i++) {
            uint8_t flag = animation->jointFlags.data[i];
            continue;

            cgltf_node *node = &doc->nodes[i + 1];

            cgltf_buffer_view *bv = &doc->buffer_views[doc->buffer_views_count++];

            bv->name = "scale";
            bv->buffer = buffer;
            bv->type = cgltf_buffer_view_type_vertices;

            cgltf_accessor *accessor = &doc->accessors[doc->accessors_count++];

            accessor->name = "scale";
            accessor->buffer_view = bv;
            accessor->component_type = cgltf_component_type_r_32f;
            accessor->type = cgltf_type_vec3;

            cgltf_animation_sampler *sampler = &anim->samplers[anim->samplers_count++];

            sampler->output = accessor;

            // TODO: Scale with flags
            size_t count = 0;
            sampler->input = singleTime;

            size_t size = count * sizeof(Vec3F32);
            bv->offset = offset;
            bv->size = size;
            offset += size;

            accessor->count = count;

            cgltf_animation_channel *channel = &anim->channels[anim->channels_count++];

            channel->target_path = cgltf_animation_path_type_scale;
            channel->target_node = node;
            channel->sampler = sampler;
        }
    }

    return writeGLB(file, doc);
}

int main(int argc, char **argv) {
    int result = 0;

    FILE *anmFile = NULL;
    FILE *gltfFile = NULL;
    Arena arena = { 0 };
    AssetPool pool = { 0 };

    if (argc < 2) goto usage;

    const char *mtlPath = argv[1];

    anmFile = fopen(mtlPath, "rb");
    if (anmFile == NULL) goto error;

    if (!poolNew(&pool, POOL_SIZE)) goto error;
    if (!arenaNew(&arena, ARENA_SIZE)) goto error;

    StdDecoder decoder;
    stdDecoder(&decoder, anmFile, &pool, &arena);

    AssetFile assetFile;
    decodeAssetFile((DecoderContext *)&decoder, &assetFile);

    void *asset = assetFile.content.asset;
    uint32_t assetType = assetFile.content.header.type;

    const char *gltfPath = argc > 2 ? argv[2] : "out.glb";

    gltfFile = fopen(gltfPath, "wb");
    if (gltfFile == NULL) goto error;

    switch (assetType) {
        case VCS_Animation: if (!writeAnimation(gltfFile, asset)) goto error; break;
        default: goto error;
    }

    goto cleanup;

usage:
    fprintf(stderr, "usage: %s anm_file [gltf_file]\n", argv[0]);

error:
    result = 1;

cleanup:
    arenaDestroy(&arena);
    poolDestroy(&pool);

    if (gltfFile != NULL) fclose(gltfFile);
    if (anmFile != NULL) fclose(anmFile);

    return result;
}
