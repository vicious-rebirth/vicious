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

    FILE *wavFile = NULL;
    FILE *musFile = NULL;

    if (argc < 2) goto usage;

    const char *wavPath = argv[1];

    wavFile = fopen(wavPath, "rb");
    if (wavFile == NULL) goto error;

    const char *musPath = argc > 2 ? argv[2] : "out.mus";
    
    musFile = fopen(musPath, "wb");
    if (musFile == NULL) goto error;

    WAVIMAHeader wavHeader;
    fread(&wavHeader, sizeof(wavHeader), 1, wavFile);

    MUSHeader musHeader = {
        .formatTag = 0x69,
        .channels = wavHeader.channels,
        .sampleRate = wavHeader.sampleRate,
        .byteRate = wavHeader.byteRate,
        .blockAlign = wavHeader.blockAlign,
        .bitsPerSample = wavHeader.bitsPerSample,
        .cbSize = wavHeader.cbSize,
        .dataSize = wavHeader.dataSize
    };
    fwrite(&musHeader, sizeof(musHeader), 1, musFile);

    void *buffer = malloc(wavHeader.dataSize);
    if (buffer == NULL) goto error;

    fread(buffer, 1, wavHeader.dataSize, wavFile);
    fwrite(buffer, 1, wavHeader.dataSize, musFile);

    free(buffer);

    goto cleanup;

usage:
    printf("usage: %s wav_file [mus_file]\n", argv[0]);

error:
    result = 1;

cleanup:
    if (musFile != NULL) fclose(musFile);
    if (wavFile != NULL) fclose(wavFile);

    return result;
}
