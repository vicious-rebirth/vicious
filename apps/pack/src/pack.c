#include <vicious.h>

#include <stdio.h>
#include <string.h>

#include <sys/stat.h>

#define ARENA_SIZE 32 * 1024 * 1024
#define POOL_SIZE 8192

#ifdef DISABLE_LOG
#define LOG(format, ...)
#else
#define LOG(format, ...) printf(format, __VA_ARGS__)
#endif

typedef struct {
    VisitorContext ctx;

    AssetPool *pool;
    Arena *arena;
    const char *projectPath;
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
    snprintf(path, sizeof(path), "%s/%s/%s_%08X%08X.%s",
        ctx->projectPath,
        folder,
        self->label.buffer.data,
        self->id.low,
        self->id.high,
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

    LOG("pack: %s\n", path);
    visitAssetFile((VisitorContext *)ctx, &assetFile);
 
    self->first = true;

    return false;
}

VisitorContext PACK_VISITOR_CONTEXT = {
    .enterAssetReference = (void *)packVisitorAssetReference
};

int main(int argc, char **argv) {
    int result = 0;

    FILE *file = NULL;
    FILE *outFile = NULL;
    Arena arena = { 0 };
    AssetPool pool = { 0 };

    PackVisitor visitor = {
        .ctx = PACK_VISITOR_CONTEXT,
    };

    if (argc < 2) goto usage;

    const char *filePath = argv[1];

    const char *ext = strrchr(filePath, '.');
    if (ext == NULL) goto usage;

    bool isLoc = strcmp(ext, ".loc") == 0;

    const char *projectPath = argc > 2 ? argv[2] : "out";

    visitor.projectPath = projectPath;

    file = fopen(filePath, "rb");
    if (file == NULL) goto error;

    if (!poolNew(&pool, POOL_SIZE)) goto error;
    if (!arenaNew(&arena, ARENA_SIZE)) goto error;

    visitor.arena = &arena;
    visitor.pool = &pool;

    StdDecoder decoder;
    stdDecoder(&decoder, file, &pool, &arena);

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
        projectPath,
        "Pack"
    );
    mkdir(path, 0755);

    const char *folder = isLoc ? "Localizations" : getClassFolder(assetFile.content.header.type);

    snprintf(path, sizeof(path), "%s/%s/%s",
        projectPath,
        "Pack",
        folder
    );
    mkdir(path, 0755);

    if (isLoc) {
        const char *fileName = strrchr(filePath, '/');
        if (fileName) fileName += 1;
        else fileName = filePath;

        snprintf(path, sizeof(path), "%s/%s/%s/%s",
            projectPath,
            "Pack",
            folder,
            fileName
        );
    } else {
        snprintf(path, sizeof(path), "%s/%s/%s/%08X%08X.%s",
            projectPath,
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

    LOG("pack: %s\n", path);
    if (isLoc) {
        encodeLocalizationFile((EncoderContext *)&encoder, &locFile);
    } else {
        encodeAssetFile((EncoderContext *)&encoder, &assetFile);
    }

    goto cleanup;

usage:
    printf("usage: %s file_path [project_path]\n", argv[0]);

error:
    result = 1;

cleanup:
    arenaDestroy(&arena);
    poolDestroy(&pool);

    if (outFile != NULL) fclose(outFile);
    if (file != NULL) fclose(file);

    return result;
}
