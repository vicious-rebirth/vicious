#include <vicious.h>

#include <stdio.h>

#include <sys/stat.h>

#include "./dds.h"

#define ARENA_SIZE 32 * 1024 * 1024
#define POOL_SIZE 8192

typedef enum {
    IF_DXT5 = 0,
    IF_DXT1 = 1,
    IF_A8 = 2,
    IF_P8 = 3,
} ImageFormat;

bool writeImageTexture(FILE *file, const ImageTexture *self) {
    switch (self->buffer.format) {
        case IF_DXT1:
        case IF_DXT5: {
            DDS_HEADER header = {
                .magic = { 'D', 'D', 'S', ' ' },
                .size = 124,
                .flags = DDSD_CAPS | DDSD_HEIGHT | DDSD_WIDTH | DDSD_PIXELFORMAT | DDSD_MIPMAPCOUNT | DDSD_LINEARSIZE,
                .width = self->buffer.width,
                .height = self->buffer.height,
                .pitchOrLinearSize = self->buffer.pixels.size,
                .mipMapCount = self->buffer.levels,
                .ddspf = {
                    .size = 32,
                    .flags = 0x4,
                    .fourCC = { 'D', 'X', 'T', self->buffer.format == IF_DXT1 ? '1' : '5' },
                },
                .caps = DDSCAPS_COMPLEX | DDSCAPS_MIPMAP | DDSCAPS_TEXTURE
            };

            fwrite(&header, 1, sizeof(header), file);
            fwrite(self->buffer.pixels.data, 1, self->buffer.pixels.size, file);
        } return true;
        case IF_A8: {
            DDS_HEADER header = {
                .magic = { 'D', 'D', 'S', ' ' },
                .size = 124,
                .flags = DDSD_CAPS | DDSD_HEIGHT | DDSD_WIDTH | DDSD_PIXELFORMAT | DDSD_MIPMAPCOUNT | DDSD_PITCH,
                .width = self->buffer.width,
                .height = self->buffer.height,
                .pitchOrLinearSize = self->buffer.width,
                .mipMapCount = self->buffer.levels,
                .ddspf = {
                    .size = 32,
                    .flags = DDPF_ALPHA,
                    .rgbBitCount = 8,
                    .aBitMask = 0xff,
                },
                .caps = DDSCAPS_COMPLEX | DDSCAPS_MIPMAP | DDSCAPS_TEXTURE
            };

            fwrite(&header, 1, sizeof(header), file);
            fwrite(self->buffer.pixels.data, 1, self->buffer.pixels.size, file);
        } return true;
        case IF_P8: {
            DDS_HEADER header = {
                .magic = { 'D', 'D', 'S', ' ' },
                .size = 124,
                .flags = DDSD_CAPS | DDSD_HEIGHT | DDSD_WIDTH | DDSD_PIXELFORMAT | DDSD_MIPMAPCOUNT | DDSD_PITCH,
                .width = self->buffer.width,
                .height = self->buffer.height,
                .pitchOrLinearSize = self->buffer.width,
                .mipMapCount = self->buffer.levels,
                .ddspf = {
                    .size = 32,
                    .flags = DDPF_PALETTEINDEXED8,
                    .rgbBitCount = 8,
                },
                .caps = DDSCAPS_COMPLEX | DDSCAPS_MIPMAP | DDSCAPS_TEXTURE
            };

            fwrite(&header, 1, sizeof(header), file);
            fwrite(self->buffer.palette.data, 1, self->buffer.palette.size, file);
            fwrite(self->buffer.pixels.data, 1, self->buffer.pixels.size, file);
        } return true;
        default: return false;
    }
}

int main(int argc, char **argv) {
    int result = 0;

    FILE *texFile = NULL;
    FILE *ddsFile = NULL;
    Arena arena = { 0 };
    AssetPool pool = { 0 };

    if (argc < 2) goto usage;

    const char *texPath = argv[1];

    texFile = fopen(texPath, "rb");
    if (texFile == NULL) goto error;

    if (!poolNew(&pool, POOL_SIZE)) goto error;
    if (!arenaNew(&arena, ARENA_SIZE)) goto error;

    StdDecoder decoder;
    stdDecoder(&decoder, texFile, &pool, &arena);

    AssetFile assetFile;
    decodeAssetFile((DecoderContext *)&decoder, &assetFile);

    void *asset = assetFile.content.asset;
    uint32_t assetType = assetFile.content.header.type;

    const char *ddsPath = argc > 2 ? argv[2] : "out.dds";
    
    ddsFile = fopen(ddsPath, "wb");
    if (ddsFile == NULL) goto error;

    switch (assetType) {
        case VCS_ImageTexture: writeImageTexture(ddsFile, asset); break;
        default: goto error;
    }

    goto cleanup;

usage:
    fprintf(stderr, "usage: %s tex_path [dds_path]\n", argv[0]);

error:
    result = 1;

cleanup:
    arenaDestroy(&arena);
    poolDestroy(&pool);

    if (ddsFile != NULL) fclose(ddsFile);
    if (texFile != NULL) fclose(texFile);

    return result;
}
