#include <vicious.h>

#include <stdio.h>

#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb_image_write.h"

#define ARENA_SIZE 32 * 1024 * 1024
#define POOL_SIZE 8192

typedef enum {
    IF_DXT5 = 0,
    IF_DXT1 = 1,
    IF_A8 = 2,
    IF_P8 = 3,
} ImageFormat;

typedef struct __attribute__((packed)){
    uint8_t b;
    uint8_t g;
    uint8_t r;
    uint8_t a;
} bgra_t;

typedef struct __attribute__((packed)) {
    uint8_t r;
    uint8_t g;
    uint8_t b;
    uint8_t a;
} rgba_t;

typedef struct __attribute__((packed)) {
    uint16_t c0;
    uint16_t c1;
    uint32_t ctable;
} dxt_color_t;

typedef struct __attribute__((packed)) {
    uint8_t a0;
    uint8_t a1;
    uint16_t ac1;
    uint32_t ac0;
} dxt_alpha_t;

typedef struct __attribute__((packed)) {
    dxt_color_t color;
} dxt1_t;

typedef struct __attribute__((packed)) {
    dxt_alpha_t alpha;
    dxt_color_t color;
} dxt5_t;

uint32_t fast_log2(uint32_t n) {
    return 31 - __builtin_clz(n);
}

void unswizzle(void *outBuffer, const void *inBuffer, uint32_t width, uint32_t height, uint32_t stride) {
    uint16_t xMax = (uint16_t)(fast_log2(width)) + 1;
    uint16_t yMax = (uint16_t)(fast_log2(height)) + 1;

    uint8_t *ptr = outBuffer;

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

            memcpy(ptr, inBuffer + off * stride, stride);
            ptr += stride;
        }
    }
}

rgba_t rgb565torgba(uint16_t c) {
    return (rgba_t) {
        .r = ((c >> 11) & 0x1F) * 255 / 31,
        .g = ((c >> 5) & 0x3F) * 255 / 63,
        .b = (c & 0x1F) * 255 / 31,
        .a = 0xFF
    };
}

rgba_t dxtColor(uint32_t x, uint32_t y, dxt_color_t c) {
    uint32_t code = (c.ctable >> (2 * (4 * y + x))) & 3;
    if (c.c0 <= c.c1) code |= 0b100;

    rgba_t r0 = rgb565torgba(c.c0);
    rgba_t r1 = rgb565torgba(c.c1);

    switch (code) {
        case 0b000:
        case 0b100: return r0;
        case 0b001:
        case 0b101: return r1;
        case 0b010: return (rgba_t) {
            .r = (2 * r0.r + r1.r) / 3,
            .g = (2 * r0.g + r1.g) / 3,
            .b = (2 * r0.b + r1.b) / 3,
            .a = 0xFF
        };
        case 0b110: return (rgba_t) {
            .r = (r0.r + r1.r) / 2,
            .g = (r0.g + r1.g) / 2,
            .b = (r0.b + r1.b) / 2,
            .a = 0xFF
        };
        case 0b011: return (rgba_t) {
            .r = (2 * r1.r + r0.r) / 3,
            .g = (2 * r1.g + r0.g) / 3,
            .b = (2 * r1.b + r0.b) / 3,
            .a = 0xFF
        };
        case 0b111: 
        default: return (rgba_t) {
            .r = 0,
            .g = 0,
            .b = 0,
            .a = 0xFF,
        };
    }
}

uint8_t dxtAlpha(uint32_t x, uint32_t y, dxt_alpha_t a) {
    uint32_t ai = 3 * (y*4 + x);

    uint32_t ac;
    if (ai <= 12) ac = (a.ac1 >> ai) & 7;
    else if (ai == 15) ac = (a.ac1 >> 15) | ((a.ac0 << 1) & 6);
    else ac = (a.ac0 >> (ai - 16)) & 7;

    switch (ac) {
        case 0: return a.a0;
        case 1: return a.a1;
        default:
            if (a.a0 > a.a1) {
                return ((8 - ac) * a.a0 + (ac - 1)* a.a1) / 7;
            } else {
                switch (ac) {
                    case 2: return (4 * a.a0 + 1 * a.a1) / 5;
                    case 3: return (3 * a.a0 + 2 * a.a1) / 5;
                    case 4: return (2 * a.a0 + 3 * a.a1) / 5;
                    case 5: return (1 * a.a0 + 4 * a.a1) / 5;
                    case 6: return 0;
                    case 7: return 255;
                    default: return 0;
                }
            }
    }
}

bool writeImageTexture(const char *filename, const ImageTexture *self) {
    rgba_t *rgba = malloc(sizeof(rgba_t) * self->buffer.width * self->buffer.height);
    if (rgba == NULL) return false;

    void *buffer;

    const dxt1_t *dxt1p = (const dxt1_t *)self->buffer.pixels.data;
    const dxt5_t *dxt5p = (const dxt5_t *)self->buffer.pixels.data;

    switch (self->buffer.format) {
        case IF_DXT1:
            for (size_t by = 0; by < self->buffer.height / 4; by++) {
                for (size_t bx = 0; bx < self->buffer.width / 4; bx++, dxt1p++) {
                    for (uint8_t dy = 0; dy < 4; dy++) {
                        size_t y = dy + by * 4;

                        for (uint8_t dx = 0; dx < 4; dx++) {
                            size_t x = dx + bx * 4;
                            size_t i = x + y * self->buffer.width;

                            rgba[i] = dxtColor(dx, dy, dxt1p->color); 
                        }
                    }
                }
            }

            break;
        case IF_DXT5:
            for (size_t by = 0; by < self->buffer.height / 4; by++) {
                for (size_t bx = 0; bx < self->buffer.width / 4; bx++, dxt5p++) {
                    for (uint8_t dy = 0; dy < 4; dy++) {
                        size_t y = dy + by * 4;

                        for (uint8_t dx = 0; dx < 4; dx++) {
                            size_t x = dx + bx * 4;
                            size_t i = x + y * self->buffer.width;

                            rgba_t c = dxtColor(dx, dy, dxt5p->color);
                            c.a = dxtAlpha(dx, dy, dxt5p->alpha);

                            rgba[i] = c; 
                        }
                    }
                }
            }

            break;
        case IF_A8:
            buffer = malloc(self->buffer.width * self->buffer.height);
            if (buffer == NULL) return false;

            unswizzle(
                buffer,
                self->buffer.pixels.data,
                self->buffer.width,
                self->buffer.height,
                1
            );

            for (size_t i = 0; i < self->buffer.width * self->buffer.height; i++) {
                uint8_t a = ((uint8_t *)buffer)[i];

                rgba[i] = (rgba_t) {
                    .r = 0,
                    .g = 0,
                    .b = 0,
                    .a = a
                };
            }

            free(buffer);
            
            break;
        case IF_P8:
            buffer = malloc(self->buffer.width * self->buffer.height);
            if (buffer == NULL) return false;

            unswizzle(
                buffer,
                self->buffer.pixels.data,
                self->buffer.width,
                self->buffer.height,
                1
            );

            for (size_t i = 0; i < self->buffer.width * self->buffer.height; i++) {
                uint8_t idx = ((uint8_t *)buffer)[i];
                bgra_t bgra = ((bgra_t *)self->buffer.palette.data)[idx];

                rgba[i] = (rgba_t) {
                    .r = bgra.r,
                    .g = bgra.g,
                    .b = bgra.b,
                    .a = bgra.a
                };
            }

            free(buffer);

            break;
    }

    bool status = stbi_write_png(
        filename,
        self->buffer.width,
        self->buffer.height,
        4,
        rgba,
        self->buffer.width * sizeof(rgba_t)
    );

    free(rgba);

    return status;
}

int main(int argc, char **argv) {
    int result = 0;

    FILE *txrFile = NULL;
    Arena arena = { 0 };
    AssetPool pool = { 0 };

    if (argc < 2) goto usage;

    const char *txrPath = argv[1];

    txrFile = fopen(txrPath, "rb");
    if (txrFile == NULL) goto error;

    if (!poolNew(&pool, POOL_SIZE)) goto error;
    if (!arenaNew(&arena, ARENA_SIZE)) goto error;

    StdDecoder decoder;
    stdDecoder(&decoder, txrFile, &pool, &arena);

    AssetFile assetFile;
    decodeAssetFile((DecoderContext *)&decoder, &assetFile);

    void *asset = assetFile.content.asset;
    uint32_t assetType = assetFile.content.header.type;

    const char *pngPath = argc > 2 ? argv[2] : "out.png";

    switch (assetType) {
        case VCS_ImageTexture: if (!writeImageTexture(pngPath, asset)) goto error; break;
        default: goto error;
    }

    goto cleanup;

usage:
    fprintf(stderr, "usage: %s txr_file [png_file]\n", argv[0]);

error:
    result = 1;

cleanup:
    arenaDestroy(&arena);
    poolDestroy(&pool);

    if (txrFile != NULL) fclose(txrFile);

    return result;
}
