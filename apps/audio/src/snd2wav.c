#include <vicious.h>

#define ARENA_SIZE 32 * 1024 * 1024
#define POOL_SIZE 8192

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
} WAVHeaderIMA;

void readSound(FILE *file, const Sound *self) {
    if (self->disabled) return;

    const WAVFmtChunk *fmtChunk = &self->buffer.fmtChunk;

    uint32_t dataSize = self->buffer.data.size;
    uint16_t samplesPerBlock = ((fmtChunk->blockAlign - fmtChunk->channels * 4) * 2 / fmtChunk->channels) + 1;

    WAVHeaderIMA header = {
        .chunkID = { 'R', 'I', 'F', 'F' },
        .chunkSize = 48 + dataSize,
        .format = { 'W', 'A', 'V', 'E' },

        .fmtID = { 'f', 'm', 't', ' ' },
        .fmtSize = 20,
        .formatTag = 0x11,
        .channels = fmtChunk->channels,
        .sampleRate = fmtChunk->sampleRate,
        .byteRate = fmtChunk->byteRate,
        .blockAlign = fmtChunk->blockAlign,
        .bitsPerSample = fmtChunk->bitsPerSample,
        .cbSize = fmtChunk->cbSize,
        .samplesPerBlock = samplesPerBlock,

        .factID = { 'f', 'a', 'c', 't' },
        .factSize = 4,
        .sampleLength = samplesPerBlock * (dataSize / fmtChunk->blockAlign),

        .dataID = { 'd', 'a', 't', 'a' },
        .dataSize = dataSize
    };

    fwrite(&header, sizeof(header), 1, file);
    fwrite(self->buffer.data.data, sizeof(uint8_t), dataSize, file);
}

void readSoundEffect(FILE *file, const SoundEffect *self) {
    readSound(file, &self->base);
}

void readVoiceOver(FILE *file, const VoiceOver *self) {
    readSound(file, &self->base);
}

int main(int argc, const char **argv) {
    int result = 0;

    Arena arena = { 0 };
    AssetPool pool = { 0 };

    AssetFile assetFile = { 0 };
    FILE *sndFile = NULL;
    FILE *wavFile = NULL;

    if (argc < 2) goto usage;

    const char *inputPath = argv[1];

    sndFile = fopen(inputPath, "rb");
    if (sndFile == NULL) goto error;

    const char *outputPath = argc > 2 ? argv[2] : "out.wav";

    wavFile = fopen(outputPath, "wb");
    if (wavFile == NULL) goto error;

    if (!arenaNew(&arena, ARENA_SIZE)) goto error;
    if (!poolNew(&pool, POOL_SIZE)) goto error;

    StdDecoder decoder;
    stdDecoder(&decoder, sndFile, &pool, &arena);

    decodeAssetFile((DecoderContext *)&decoder, &assetFile);

    switch (assetFile.content.header.type) {
        case 38: readSound(wavFile, assetFile.content.asset); break;
        case 42: readSoundEffect(wavFile, assetFile.content.asset); break;
        case 354: readVoiceOver(wavFile, assetFile.content.asset); break;
        default: goto error;
    }

    goto cleanup;

usage:
    printf("usage: %s snd_file [wav_file]\n", argv[0]);

error:
    result = 1;

cleanup:
    arenaDestroy(&arena);
    poolDestroy(&pool);

    if (wavFile != NULL) fclose(wavFile);
    if (sndFile != NULL) fclose(sndFile);

    return result;
}
