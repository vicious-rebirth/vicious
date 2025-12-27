#include <vicious.h>

#include <stdio.h>

#include "./dds.h"
#include "./tga.h"

#define ARENA_SIZE 32 * 1024 * 1024
#define POOL_SIZE 8192

typedef enum {
    IF_DXT5 = 0,
    IF_DXT1 = 1,
    IF_A8 = 2,
    IF_P8 = 3,
} ImageFormat;

uint32_t fast_log2(uint32_t n) {
    return 31 - __builtin_clz(n);
}

void x8Write(FILE *file, const uint8_t *buffer, uint32_t width, uint32_t height) {
    uint16_t xMax = (uint16_t)(fast_log2(width)) + 1;
    uint16_t yMax = (uint16_t)(fast_log2(height)) + 1;

    for (int y = 0; y < height; y++) {
        int yI = y;
        uint32_t yOff = 0;
        uint32_t yBit = 1 << (yMax * 2 + 1);

        for (uint16_t i = 0; i < yMax; i++) {
            if (yI & 1) yOff |= yBit;
            yOff >>= 2;
            yI >>= 1;
        }

        for (int x = 0; x < width; x++) {
            int xI = x;
            uint32_t xOff = 0;
            uint32_t xBit = 1u << (xMax * 2);

            for (uint16_t i = 0; i < xMax; i++) {
                if (xI & 1) xOff |= xBit;
                xOff >>= 2;
                xI >>= 1;
            }

            int off = xOff | yOff;

            fputc(buffer[off], file);
        }
    }
} 

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
        case IF_A8:
        case IF_P8: {
            TGA_HEADER header = {
                .idLength = 0,
                .colorMapType = self->buffer.format == IF_P8 ? 1 : 0,
                .dataTypeCode = self->buffer.format == IF_P8 ? TGA_COLORMAP : TGA_GRAY,
                .colorMapOrigin = 0,
                .colorMapLength = self->buffer.format == IF_P8 ? self->buffer.palette.size / 4 : 0,
                .colorMapBlockSize = self->buffer.format == IF_P8 ? 32 : 0,
                .xOrigin = 0,
                .yOrigin = 0,
                .width = self->buffer.width,
                .height = self->buffer.height,
                .bitsPerPixel = 8,
                .imageDescriptor = 0x20
            };

            fwrite(&header, 1, sizeof(header), file);
            if (self->buffer.format == IF_P8) fwrite(self->buffer.palette.data, 1, self->buffer.palette.size, file);
            x8Write(file, self->buffer.pixels.data, self->buffer.width, self->buffer.height);
        } return true;
        default: return false;
    }
}

int main(int argc, char **argv) {
    int result = 0;

    FILE *texFile = NULL;
    FILE *imgFile = NULL;
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

    char *imgExt;
    switch (assetType) {
        case VCS_ImageTexture: {
            uint32_t format = ((ImageTexture *)asset)->buffer.format;
            switch (format) {
                case IF_DXT1:
                case IF_DXT5: imgExt = "dds"; break;
                case IF_A8:
                case IF_P8: imgExt = "tga"; break;
                default:
                    fprintf(stderr, "unhandled texture format: %d\n", format);
                    goto error;
            }
        } break;
        default:
            fprintf(stderr, "not a texture: %d\n", assetType);
            goto error;
    }

    const char *imgPrefixPath = argc > 2 ? argv[2] : "out";
    char imgPath[2048];
    snprintf(imgPath, sizeof(imgPath), "%s.%s", imgPrefixPath, imgExt);

    imgFile = fopen(imgPath, "wb");
    if (imgFile == NULL) goto error;

    switch (assetType) {
        case VCS_ImageTexture: writeImageTexture(imgFile, asset); break;
        default: goto error;
    }

    goto cleanup;

usage:
    fprintf(stderr, "usage: %s tex_path [img_prefix_path]\n", argv[0]);

error:
    result = 1;

cleanup:
    arenaDestroy(&arena);
    poolDestroy(&pool);

    if (imgFile != NULL) fclose(imgFile);
    if (texFile != NULL) fclose(texFile);

    return result;
}
