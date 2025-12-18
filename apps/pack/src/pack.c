#include <vicious.h>

#include <stdio.h>
#include <string.h>

#include <sys/stat.h>

#define ARENA_SIZE 32 * 1024 * 1024
#define POOL_SIZE 8192

typedef struct {
    VisitorContext ctx;

    AssetPool *pool;
    Arena *arena;
    const char *inputPath;
} PackVisitor;

static bool packVisitorAssetReference(PackVisitor *ctx, AssetReference *self) {
    if (self->type == -1) return false;

    uint32_t type = poolGetType(ctx->pool, *(uint64_t *)&self->id);
    if (type) { 
        self->type = type;
        return false;
    }

    const char *folder = getClassFolder(self->type);
    const char *ext = getClassExtension(self->type);

    char path[1024];
    snprintf(path, sizeof(path), "%s/%s/%08X%08X_%s.%s", 
        ctx->inputPath, 
        folder,
        self->id.low,
        self->id.high,
        self->label.buffer.data, 
        ext
    );

    FILE *file = fopen(path, "rb");
    if (file == NULL) return false;

    StdDecoder decoder;
    stdDecoder(&decoder, file, ctx->pool, ctx->arena);

    AssetFile assetFile;
    decodeAssetFile((DecoderContext *)&decoder, &assetFile);

    fclose(file);

    self->asset = assetFile.content.asset;
    self->type = assetFile.content.header.type;

    poolInsert(ctx->pool, *(uint64_t *)&self->id, self->type, self->asset);

    printf("pack: %s\n", path);
    visitAssetFile((VisitorContext *)ctx, &assetFile);
    
    self->first = true;

    return false;
}

VisitorContext PACK_VISITOR_CONTEXT = {
    .enterAssetReference = (void *)packVisitorAssetReference
};

int main(int argc, char **argv) {
    bool isError = false;


    FILE *inFile = NULL;
    FILE *outFile = NULL;
    Arena arena = { 0 };
    AssetPool pool = { 0 };

    PackVisitor visitor = {
        .ctx = PACK_VISITOR_CONTEXT,
    };

    if (argc < 2) goto usage;

    const char *inputFile = argv[1];

    const char *inExt = strrchr(inputFile, '.');
    if (inExt == NULL) goto usage;

    bool isLoc = strcmp(inExt, ".loc") == 0;

    const char *inputPath = argc > 2 ? argv[2] : "out";

    visitor.inputPath = inputPath;

    inFile = fopen(inputFile, "rb");
    if (inFile == NULL) goto error;

    if (!poolNew(&pool, POOL_SIZE)) goto error;
    if (!arenaNew(&arena, ARENA_SIZE)) goto error;

    visitor.arena = &arena;
    visitor.pool = &pool;

    StdDecoder decoder;
    stdDecoder(&decoder, inFile, &pool, &arena);

    AssetFile assetFile;
    LocalizationFile locFile;

    if (isLoc) {
        decodeLocalizationFile((DecoderContext *)&decoder, &locFile);
        visitLocalizationFile((VisitorContext *)&visitor, &locFile);
    } else {
        decodeAssetFile((DecoderContext *)&decoder, &assetFile);
        visitAssetFile((VisitorContext *)&visitor, &assetFile);
    }

    char path[1024];

    snprintf(path, sizeof(path), "%s/%s",
        inputPath,
        "Pack"
    );
    mkdir(path, 0755);

    const char *folder = isLoc ? "Localizations" : getClassFolder(assetFile.content.header.type);

    snprintf(path, sizeof(path), "%s/%s/%s",
        inputPath,
        "Pack",
        folder
    );
    mkdir(path, 0755);

    if (isLoc) {
        const char *fileName = strrchr(inputFile, '/');
        if (fileName) fileName += 1;
        else fileName = inputFile;

        snprintf(path, sizeof(path), "%s/%s/%s/%s",
            inputPath,
            "Pack",
            folder,
            fileName
        );
    } else {
        snprintf(path, sizeof(path), "%s/%s/%s/%08X%08X.%s",
            inputPath,
            "Pack",
            folder,
            assetFile.content.header.id.low,
            assetFile.content.header.id.high,
            getClassExtension(assetFile.content.header.type)
        );
    }

    outFile = fopen(path, "wb");
    if (outFile == NULL) goto error;

    StdEncoder encoder;
    stdEncoder(&encoder, outFile, &pool);

    printf("pack: %s\n", path);
    if (isLoc) {
       encodeLocalizationFile((EncoderContext *)&encoder, &locFile); 
    } else {
        encodeAssetFile((EncoderContext *)&encoder, &assetFile);
    }

    goto done;

usage:
    printf("usage: %s input_file [input_path]\n", argv[0]);

error:
    isError = true;

done:
    arenaDestroy(&arena);
    poolDestroy(&pool);

    if (outFile != NULL) fclose(outFile);
    if (inFile != NULL) fclose(inFile);

    return isError ? 1 : 0;
}
