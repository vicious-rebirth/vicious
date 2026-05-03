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

const AssetFile REFERENCE_FILE = {
    .magicHeader = 0xfaaffaaf,
    .version = 2,
    .content = {
        .metadata = {
            .header = {
                .magic = 0xbbbbbbbb,
                .version = 1,
                .end = 0
            },
            .footer = {
                .magic = 0xbebebebe
            }
        },
        .header = {
           .metadata = {
                .header = {
                    .magic = 0xbbbbbbbb,
                    .version = 1,
                    .end = 0
                },
                .footer = {
                    .magic = 0xbebebebe
                }
           },
           .offset = 0x20,
           // TODO: This changes
           .f_1 = 0,
           .id = { 0 },
           .label = { 0 },
           .type = 0,
           .f_2 = 0
        },
        .asset = NULL
    },
    .magicFooter = 0xfeeffeef 
};

typedef struct {
    VisitorContext ctx;

    const char *filePath;
    const char *projectPath;
} Visitor;

static void unpackVisitorAssetFile(Visitor *ctx, AssetFile *self) {
    char path[1024];

    const char *folder = getClassFolder(self->content.header.type);

    snprintf(path, sizeof(path), "%s/%s", ctx->projectPath, folder);
    mkdir(path, 0755);

    snprintf(path, sizeof(path), "%s/%s/%s_%08X%08X.%s", 
        ctx->projectPath, 
        folder, 
        self->content.header.label.buffer.data,
        self->content.header.id.low,
        self->content.header.id.high,
        getClassExtension(self->content.header.type)
    );

    FILE *file = fopen(path, "wb");
    if (file == NULL) return;

    StdEncoder encoder;
    stdEncoder(&encoder, file, NULL);

    LOG("unpack: %s\n", path);
    encodeAssetFile((EncoderContext *)&encoder, self);

    fclose(file);
}

static void unpackVisitorLocalizationFile(Visitor *ctx, LocalizationFile *self) {
    char path[1024];

    snprintf(path, sizeof(path), "%s/Localizations", ctx->projectPath);
    mkdir(path, 0755);

    const char *fileName = strrchr(ctx->filePath, '/');
    if (fileName) fileName += 1;
    else fileName = ctx->filePath;

    snprintf(path, sizeof(path), "%s/Localizations/%s", 
        ctx->projectPath,
        fileName
    );

    FILE *file = fopen(path, "wb");
    if (file == NULL) return;

    StdEncoder encoder;
    stdEncoder(&encoder, file, NULL);

    LOG("unpack: %s\n", path);
    encodeLocalizationFile((EncoderContext *)&encoder, self);

    fclose(file);
}

static void unpackVisitorAssetReference(Visitor *ctx, AssetReference *self) {
    if (self->type == -1) return;
    if (!self->first) return;
    if (self->asset == 0) return;

    AssetFile assetFile = REFERENCE_FILE;

    assetFile.content.header.id = self->id;
    assetFile.content.header.label = self->label;
    assetFile.content.header.type = self->type;
    assetFile.content.asset = self->asset;

    unpackVisitorAssetFile(ctx, &assetFile);

    self->first = false;
}

VisitorContext VISITOR_CONTEXT = {
    .exitAssetReference = (void *)unpackVisitorAssetReference,
    .exitLocalizationFile = (void *)unpackVisitorLocalizationFile,
    .exitAssetFile = (void *)unpackVisitorAssetFile
};

int main(int argc, char **argv) {
    int result = 0;

    FILE *inFile = NULL;
    Arena arena = { 0 };
    AssetPool pool = { 0 };

    if (argc < 2) goto usage;

    const char *filePath = argv[1];

    const char *ext = strrchr(filePath, '.');
    if (ext == NULL) goto usage;

    bool isLoc = strcmp(ext, ".loc") == 0;

    inFile = fopen(filePath, "rb");
    if (inFile == NULL) goto error;

    if (!poolNew(&pool, POOL_SIZE)) goto error;
    if (!arenaNew(&arena, ARENA_SIZE)) goto error;

    StdDecoder decoder;
    stdDecoder(&decoder, inFile, &pool, &arena);

    const char *projectPath = argc > 2 ? argv[2] : "out";
    mkdir(projectPath, 0755);

    Visitor visitor = {
        .ctx = VISITOR_CONTEXT,
        .filePath = filePath,
        .projectPath = projectPath,
    };

    if (isLoc) {
        LocalizationFile locFile;
        decodeLocalizationFile((DecoderContext *)&decoder, &locFile);
        visitLocalizationFile((VisitorContext *)&visitor, &locFile);
    } else {
        AssetFile assetFile;
        decodeAssetFile((DecoderContext *)&decoder, &assetFile);
        visitAssetFile((VisitorContext *)&visitor, &assetFile);
    }

    goto cleanup;

usage:
    printf("usage: %s file [project_path]\n", argv[0]);

error:
    result = 1;

cleanup:
    arenaDestroy(&arena);
    poolDestroy(&pool);

    if (inFile != NULL) fclose(inFile);

    return 1;
}
