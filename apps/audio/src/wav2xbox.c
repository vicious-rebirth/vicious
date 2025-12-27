#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

#define MAX_CHANNELS 2

static int indexTable[16] = {
    -1,	-1,	-1,	-1,	2,	4,	6,	8,
    -1,	-1,	-1,	-1,	2,	4,	6,	8
};

static int stepTable[89] = {
    7, 8, 9, 10, 11, 12, 13, 14,
    16, 17, 19, 21, 23, 25, 28, 31,
    34, 37, 41, 45, 50, 55, 60, 66,
    73, 80, 88, 97, 107, 118, 130, 143,
    157, 173, 190, 209, 230, 253, 279, 307,
    337, 371, 408, 449, 494, 544, 598, 658,
    724, 796, 876, 963, 1060, 1166, 1282, 1411,
    1552, 1707, 1878, 2066, 2272, 2499, 2749, 3024,
    3327, 3660, 4026, 4428, 4871, 5358, 5894, 6484,
    7132, 7845, 8630, 9493, 10442, 11487, 12635, 13899,
    15289, 16818, 18500, 20350, 22385, 24623, 27086, 29794,
    32767
};

typedef struct __attribute__((packed)) {
    char chunkID[4];
    uint32_t chunkSize;
    char format[4];

    char fmtID[4];
    uint32_t fmtSize;
    uint16_t formatTag;
    uint16_t channels;
    uint32_t sampleRate;
    uint32_t byteRate;
    uint16_t blockAlign;
    uint16_t bitsPerSample;
    uint16_t cbSize;
    uint16_t samplesPerBlock;

    char factID[4];
    uint32_t factSize;
    uint32_t sampleLength;

    char dataID[4];
    uint32_t dataSize;
} WAVIMAHeader;

typedef struct __attribute__((packed)) {
    uint16_t predictor;
    uint8_t stepIndex;
    uint8_t reserve;
} WAVIMABlock;

int main(int argc, const char **argv) {
    int result = 0;

    FILE *inWavFile = NULL;
    FILE *outWavFile = NULL;

    if (argc < 2) goto usage;

    const char *inWavPath = argv[1];

    inWavFile = fopen(inWavPath, "rb");
    if (inWavFile == NULL) goto error;

    const char *outWavPath = argc > 2 ? argv[2] : "out.wav";
    
    outWavFile = fopen(outWavPath, "wb");
    if (outWavFile == NULL) goto error;

    WAVIMAHeader inHeader;
    fread(&inHeader, sizeof(inHeader), 1, inWavFile);

    if (inHeader.formatTag != 0x11) {
        printf("only ima wav files are supported\n");
        goto error;
    }

    if (inHeader.channels > MAX_CHANNELS) {
        printf("too many channels\n");
        goto error;
    }

    uint16_t channels = inHeader.channels;
    uint32_t inBlockCount = inHeader.dataSize / inHeader.blockAlign;
    uint32_t inSamplesPerBlock = inHeader.samplesPerBlock;
    uint32_t sampleCount = inBlockCount * inSamplesPerBlock;

    uint16_t outBlockAlign = channels * 36;
    uint16_t outSamplesPerBlock = ((outBlockAlign - channels * 4) * 2 / channels) + 1;
    uint32_t outBlockCount = sampleCount / outSamplesPerBlock;
    uint32_t outDataSize = outBlockCount * outBlockAlign;

    WAVIMAHeader outHeader = {
        .chunkID = { 'R', 'I', 'F', 'F' },
        .chunkSize = 48 + outDataSize,
        .format = { 'W', 'A', 'V', 'E' },

        .fmtID = { 'f', 'm', 't', ' ' },
        .fmtSize = 20,
        .formatTag = 0x11,
        .channels = channels,
        .sampleRate = inHeader.sampleRate,
        .byteRate = inHeader.byteRate,
        .blockAlign = outBlockAlign,
        .bitsPerSample = inHeader.bitsPerSample,
        .cbSize = inHeader.cbSize,
        .samplesPerBlock = outSamplesPerBlock,

        .factID = { 'f', 'a', 'c', 't' },
        .factSize = 4,
        .sampleLength = outSamplesPerBlock * (outDataSize / outBlockAlign),

        .dataID = { 'd', 'a', 't', 'a' },
        .dataSize = outDataSize
    };
    fwrite(&outHeader, sizeof(outHeader), 1, outWavFile);

    WAVIMABlock blocks[MAX_CHANNELS] = { 0 };
    size_t si = 0;
    for (size_t i = 0; i < inBlockCount; i++) {
        fread(blocks, sizeof(blocks[0]), channels, inWavFile);

        for (size_t j = 0; j < (inSamplesPerBlock - 1) / 8; j++, si += 8) {
            if (si % (outSamplesPerBlock - 1) == 0) fwrite(blocks, sizeof(blocks[0]), channels, outWavFile);

            for (size_t c = 0; c < channels; c++) {
                WAVIMABlock *block = &blocks[c];

                uint32_t code;
                fread(&code, sizeof(code), 1, inWavFile);
                fwrite(&code, sizeof(code), 1, outWavFile);

                for (size_t k = 0; k < 8; k++, code >>= 4) {
                    int step = stepTable[block->stepIndex];
                    int delta = step >> 3;

                    if ((code & 1) != 0) delta += step >> 2;
                    if ((code & 2) != 0) delta += step >> 1;
                    if ((code & 4) != 0) delta += step;
                    if ((code & 8) != 0) delta = -delta;

                    block->predictor += delta;

                    int nextIndex = (int)block->stepIndex + indexTable[code & 0xF];
                    if (nextIndex < 0) block->stepIndex = 0;
                    else if (nextIndex > 88) block->stepIndex = 88;
                    else block->stepIndex = nextIndex;
                }
            }
        }
    }

    goto cleanup;

usage:
    printf("usage: %s in_wav_file [out_wav_file]\n", argv[0]);

error:
    result = 1;

cleanup:
    if (inWavFile != NULL) fclose(inWavFile);
    if (outWavFile != NULL) fclose(outWavFile);

    return result;

}
