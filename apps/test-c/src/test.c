#include <vicious.h>

#include <stdio.h>
#include <string.h>

#define ARENA_SIZE 32 * 1024 * 1024
#define POOL_SIZE 8192

int main(int argc, char **argv) {
    bool isError = false;

    FILE *inFile = NULL;
    FILE *outFile = NULL;
    Arena arena = { 0 };
    AssetPool pool = { 0 };

    if (argc < 3) goto usage;

    const char *inputPath = argv[1];

    const char *ext = strrchr(inputPath, '.');
    if (ext == NULL) goto usage;

    bool isLoc = strcmp(ext, ".loc") == 0;

    inFile = fopen(inputPath, "rb");
    if (inFile == NULL) goto error;

    const char *outputPath = argv[2];

    outFile = fopen(outputPath, "wb");
    if (outFile == NULL) goto error;

    if (!poolNew(&pool, POOL_SIZE)) goto error;
    if (!arenaNew(&arena, ARENA_SIZE)) goto error;

    StdDecoder decoder;
    stdDecoder(&decoder, inFile, &pool, &arena);

    StdEncoder encoder;
    stdEncoder(&encoder, outFile, &pool);

    if (isLoc) {
        LocalizationFile locFile = { 0 };

        decodeLocalizationFile((DecoderContext *)&decoder, &locFile);
        encodeLocalizationFile((EncoderContext *)&encoder, &locFile);
    } else {
        AssetFile assetFile = { 0 };

        decodeAssetFile((DecoderContext *)&decoder, &assetFile);
        encodeAssetFile((EncoderContext *)&encoder, &assetFile);
    }

    goto done;

usage:
    printf("usage: %s input_file output_file\n", argv[0]);

error:
    isError = true;

done:
    arenaDestroy(&arena);
    poolDestroy(&pool);

    if (outFile != NULL) fclose(outFile);
    if (inFile != NULL) fclose(inFile);

    return isError ? 1 : 0;
}
