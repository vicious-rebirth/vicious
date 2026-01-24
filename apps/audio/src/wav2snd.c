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
} WAVIMAHeader;

void writeSound(FILE *file, Sound *self) {
    if (self->disabled) return;

    WAVIMAHeader header;
    fread(&header, sizeof(header), 1, file);

    WAVFmtChunk *fmtChunk = &self->buffer.fmtChunk;
    fmtChunk->format = 0x69;
    fmtChunk->channels = header.channels;
    fmtChunk->sampleRate = header.sampleRate;
    fmtChunk->byteRate = header.byteRate;
    fmtChunk->blockAlign = header.blockAlign;
    fmtChunk->bitsPerSample = header.bitsPerSample;
    fmtChunk->cbSize = header.cbSize;

    uint32_t dataSize = header.dataSize;
    uint8_t *data = malloc(dataSize);
    fread(data, sizeof(uint8_t), dataSize, file);

    self->buffer.data.size = dataSize;
    self->buffer.data.data = data;
}

void writeSoundEffect(FILE *file, SoundEffect *self) {
    writeSound(file, &self->base);
}

void writeVoiceOver(FILE *file, VoiceOver *self) {
    writeSound(file, &self->base);
}

int main(int argc, const char **argv) {
    int result = 0;

    Arena arena = { 0 };
    AssetPool pool = { 0 };

    AssetFile assetFile = { 0 };
    FILE *inSndFile = NULL;
    FILE *outSndFile = NULL;
    FILE *wavFile = NULL;

    if (argc < 3) goto usage;

    const char *wavPath = argv[1];

    wavFile = fopen(wavPath, "rb");
    if (wavFile == NULL) goto error;

    const char *inSndPath = argv[2];

    inSndFile = fopen(inSndPath, "rb");
    if (inSndFile == NULL) goto error;

    if (!arenaNew(&arena, ARENA_SIZE)) goto error;
    if (!poolNew(&pool, POOL_SIZE)) goto error;

    StdDecoder decoder;
    stdDecoder(&decoder, inSndFile, &pool, &arena);

    decodeAssetFile((DecoderContext *)&decoder, &assetFile);

    void *asset = assetFile.content.asset;
    uint32_t assetType = assetFile.content.header.type;

    switch (assetType) {
        case VCS_Sound: writeSound(wavFile, asset); break;
        case VCS_SoundEffect: writeSoundEffect(wavFile, asset); break;
        case VCS_VoiceOver: writeVoiceOver(wavFile, asset); break;
        default: goto error;
    }

    fclose(inSndFile);
    inSndFile = NULL;

    const char *outSndPath = argc > 3 ? argv[3] : "out.snd";

    outSndFile = fopen(outSndPath, "wb");
    if (outSndFile == NULL) goto error;

    StdEncoder encoder;
    stdEncoder(&encoder, outSndFile, &pool);

    encodeAssetFile((EncoderContext *)&encoder, &assetFile);

    goto cleanup;

usage:
    printf("usage: %s wav_file in_snd_file [out_snd_file]\n", argv[0]);

error:
    result = 1;

cleanup:
    arenaDestroy(&arena);
    poolDestroy(&pool);

    if (wavFile != NULL) fclose(wavFile);
    if (inSndFile != NULL) fclose(inSndFile);

    return result;
}
