#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

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
    uint16_t formatTag;
    uint16_t channels;
    uint32_t sampleRate;
    uint32_t byteRate;
    uint16_t blockAlign;
    uint16_t bitsPerSample;
    uint16_t cbSize;
    uint32_t dataSize;
} MUSHeader;

int main(int argc, const char **argv) {
    int result = 0;

    FILE *musFile = NULL;
    FILE *wavFile = NULL;

    if (argc < 2) goto error;

    const char *musPath = argv[1];

    musFile = fopen(musPath, "rb");
    if (musFile == NULL) goto error;

    const char *wavPath = argc > 2 ? argv[2] : "out.wav";

    wavFile = fopen(wavPath, "wb");
    if (wavFile == NULL) goto error;

    MUSHeader musHeader;
    fread(&musHeader, sizeof(musHeader), 1, musFile);

    uint16_t samplesPerBlock = ((musHeader.blockAlign - musHeader.channels * 4) * 2 / musHeader.channels) + 1;
    WAVIMAHeader wavHeader = {
        .chunkID = { 'R', 'I', 'F', 'F' },
        .chunkSize = 48 + musHeader.dataSize,
        .format = { 'W', 'A', 'V', 'E' },

        .fmtID = { 'f', 'm', 't', ' ' },
        .fmtSize = 20,
        .formatTag = 0x11,
        .channels = musHeader.channels,
        .sampleRate = musHeader.sampleRate,
        .byteRate = musHeader.byteRate,
        .blockAlign = musHeader.blockAlign,
        .bitsPerSample = musHeader.bitsPerSample,
        .cbSize = musHeader.cbSize,
        .samplesPerBlock = samplesPerBlock,

        .factID = { 'f', 'a', 'c', 't' },
        .factSize = 4,
        .sampleLength = samplesPerBlock * (musHeader.dataSize / musHeader.blockAlign),

        .dataID = { 'd', 'a', 't', 'a' },
        .dataSize = musHeader.dataSize
    };
    fwrite(&wavHeader, sizeof(wavHeader), 1, wavFile);

    void *buffer = malloc(musHeader.dataSize);
    if (buffer == NULL) goto error;

    fread(buffer, 1, musHeader.dataSize, musFile);
    fwrite(buffer, 1, musHeader.dataSize, wavFile);

    free(buffer);

    goto cleanup;

usage:
    printf("usage: %s mus_file [wav_file]\n", argv[0]);

error:
    result = 1;

cleanup:
    if (musFile != NULL) fclose(musFile);
    if (wavFile != NULL) fclose(wavFile);

    return result;
}
