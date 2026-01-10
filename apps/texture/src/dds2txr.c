#include <vicious.h>

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "./dds.h"

#define ARENA_SIZE 32 * 1024 * 1024
#define POOL_SIZE 8192

typedef enum {
    IF_DXT5 = 0,
    IF_DXT1 = 1,
    IF_A8 = 2,
    IF_P8 = 3,
} ImageFormat;

int main(int argc, char **argv) {
    int result = 0;

    FILE *ddsFile = NULL;
    FILE *inTxrFile = NULL;
    FILE *outTxrFile = NULL;

    Arena arena = { 0 };
    AssetPool pool = { 0 };

    void *pixelBuffer = NULL;
    void *paletteBuffer = NULL;

    if (argc < 3) goto usage;

    const char *ddsPath = argv[1];
    const char *refTxrPath = argv[2];
    const char *txrPath = argc > 3 ? argv[3] : "out.txr";

    ddsFile = fopen(ddsPath, "rb");
    if (ddsFile == NULL) goto error;

    DDS_HEADER ddsHeader;
    fread(&ddsHeader, sizeof(ddsHeader), 1, ddsFile);

    if (memcmp(ddsHeader.magic, "DDS ", 4) != 0) goto error;

    uint32_t format;
    if (ddsHeader.ddspf.flags & DDPF_FOURCC) {
        if (memcmp(ddsHeader.ddspf.fourCC, "DXT1", 4) == 0) {
            format = IF_DXT1;
        } else if (memcmp(ddsHeader.ddspf.fourCC, "DXT5", 4) == 0) {
            format = IF_DXT5;
        } else {
            goto error;
        }
    } else if (ddsHeader.ddspf.flags & DDPF_ALPHA) {
        format = IF_A8;
    } else if (ddsHeader.ddspf.flags & DDPF_PALETTEINDEXED8) {
        format = IF_P8;
    } else {
        goto error;
    }

    size_t paletteBufferSize = 0;
    if (format == IF_P8) {
        paletteBufferSize = 1024;

        paletteBuffer = malloc(paletteBufferSize);
        if (paletteBuffer == NULL) goto error;

        fread(paletteBuffer, 1, paletteBufferSize, ddsFile);
    }

    fseek(ddsFile, 0, SEEK_END);

    long fileSize = ftell(ddsFile);
    fseek(ddsFile, sizeof(DDS_HEADER) + paletteBufferSize, SEEK_SET);

    size_t pixelBufferSize = fileSize - sizeof(DDS_HEADER) - paletteBufferSize;

    pixelBuffer = malloc(pixelBufferSize);
    if (pixelBuffer == NULL) goto error;

    fread(pixelBuffer, 1, pixelBufferSize, ddsFile);

    fclose(ddsFile);
    ddsFile = NULL;

    inTxrFile = fopen(refTxrPath, "rb");
    if (inTxrFile == NULL) goto error;

    if (!poolNew(&pool, POOL_SIZE)) goto error;
    if (!arenaNew(&arena, ARENA_SIZE)) goto error;

    StdDecoder decoder;
    stdDecoder(&decoder, inTxrFile, &pool, &arena);

    AssetFile assetFile;
    decodeAssetFile((DecoderContext *)&decoder, &assetFile);

    fclose(inTxrFile);
    inTxrFile = NULL;

    if (assetFile.content.header.type != VCS_ImageTexture) goto error;

    ImageTexture *texture = (ImageTexture *)assetFile.content.asset;

    texture->buffer.format = format;
    texture->buffer.width = ddsHeader.width;
    texture->buffer.height = ddsHeader.height;
    texture->buffer.levels = ddsHeader.mipMapCount;

    texture->buffer.pixels.size = pixelBufferSize;
    texture->buffer.pixels.data = pixelBuffer;

    if (format == IF_P8) {
        texture->buffer.palette.size = paletteBufferSize;
        texture->buffer.palette.data = paletteBuffer;
    } else {
        texture->buffer.palette.size = 0;
        texture->buffer.palette.data = NULL;
    }

    outTxrFile = fopen(txrPath, "wb");
    if (outTxrFile == NULL) goto error;

    StdEncoder encoder;
    stdEncoder(&encoder, outTxrFile, &pool);

    encodeAssetFile((EncoderContext *)&encoder, &assetFile);

    goto cleanup;

usage:
    fprintf(stderr, "usage: %s dds_path in_txr_path [out_txr_path]\n", argv[0]);

error:
    result = 1;

cleanup:
    arenaDestroy(&arena);
    poolDestroy(&pool);

    if (outTxrFile != NULL) fclose(outTxrFile);
    if (inTxrFile != NULL) fclose(inTxrFile);
    if (ddsFile != NULL) fclose(ddsFile);

    if (pixelBuffer != NULL) free(pixelBuffer);
    if (paletteBuffer != NULL) free(paletteBuffer);

    return result;
}
