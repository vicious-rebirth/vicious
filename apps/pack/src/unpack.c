#include <vicious.h>

#include <stdio.h>
#include <string.h>

#include <sys/stat.h>

#define ARENA_SIZE 32 * 1024 * 1024
#define POOL_SIZE 8192

typedef struct {
    VisitorContext ctx;

    const char *outputPath;
    const AssetFile *rootFile;
} UnpackVisitor;

static void unpackVisitorError(UnpackVisitor *ctx, const char *scope, const char *message) {
    printf("%s: %s\n", scope, message);
}

static bool unpackVisitorAssetFile(UnpackVisitor *ctx, AssetFile *self) {
    const char *folder = getClassFolder(self->content.header.type);
    const char *ext = getClassExtension(self->content.header.type);

    char buffer[1024];
    snprintf(buffer, sizeof(buffer), "%s/%s", ctx->outputPath, folder);
    mkdir(buffer, 0755);

    snprintf(buffer, sizeof(buffer), "%s/%s/%08X%08X_%s.%s", 
        ctx->outputPath, 
        folder, 
        self->content.header.id.low,
        self->content.header.id.high,
        self->content.header.label.buffer.data, 
        ext
    );
    printf("Unpack: %s\n", buffer);

    FILE *file = fopen(buffer, "w");
    if (file == NULL) return false;

    StdEncoder encoder;
    stdEncoder(&encoder, file, NULL);

    encodeAssetFile((EncoderContext *)&encoder, self);

    fclose(file);

    return false;
}

static bool unpackVisitorAssetReference(UnpackVisitor *ctx, AssetReference *self) {
    if (self->type == -1) return false;
    if (!self->first) return false;
    if (self->asset == 0) return false;

    AssetFile assetFile = *ctx->rootFile;

    assetFile.content.header.id = self->id;
    assetFile.content.header.label = self->label;
    assetFile.content.header.type = self->type;
    assetFile.content.asset = self->asset;

    unpackVisitorAssetFile(ctx, &assetFile);

    self->first = false;

    return false;
}

VisitorContext UNPACK_VISITOR_CONTEXT = {
    .error = (void *)unpackVisitorError,
    .exitAssetReference = (void *)unpackVisitorAssetReference,
    .exitAssetFile = (void *)unpackVisitorAssetFile
};

int main(int argc, char **argv) {
    AssetFile assetFile = { 0 };

    StdDecoder decoder;
    FILE *file = NULL;
    Arena arena = { 0 };
    AssetPool pool = { 0 };

    UnpackVisitor unpackVisitor = {
        .ctx = UNPACK_VISITOR_CONTEXT,
        .rootFile = &assetFile
    };

    if (argc < 2) goto usage;

    const char *inputFile = argv[1];

    const char *ext = strrchr(inputFile, '.');
    if (ext == NULL) goto usage;

    bool isLoc = strcmp(ext, ".loc") == 0;
    if (isLoc) goto usage;

    const char *outputPath = argc > 2 ? argv[2] : "out";
    mkdir(outputPath, 0755);

    unpackVisitor.outputPath = outputPath;

    file = fopen(inputFile, "r");
    if (file == NULL) goto error;

    if (!poolNew(&pool, POOL_SIZE)) goto error;
    if (!arenaNew(&arena, ARENA_SIZE)) goto error;

    stdDecoder(&decoder, file, &pool, &arena);

    decodeAssetFile((DecoderContext *)&decoder, &assetFile);

    visitAssetFile((VisitorContext *)&unpackVisitor, &assetFile);

    return 0;
usage:
    printf("usage: %s input_file [output_path]\n", argv[0]);

error:
    arenaDestroy(&arena);
    poolDestroy(&pool);

    if (file != NULL) fclose(file);

    return 1;
}
