#include <vicious.h>

#include <stdio.h>
#include <string.h>

#include <sys/stat.h>

#define ARENA_SIZE 32 * 1024 * 1024
#define POOL_SIZE 8192

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

    const char *inputFile;
    const char *outputPath;
} PackVisitor;

static bool unpackVisitorAssetFile(PackVisitor *ctx, AssetFile *self) {
    char path[1024];

    const char *folder = getClassFolder(self->content.header.type);

    snprintf(path, sizeof(path), "%s/%s", ctx->outputPath, folder);
    mkdir(path, 0755);

    snprintf(path, sizeof(path), "%s/%s/%08X%08X_%s.%s", 
        ctx->outputPath, 
        folder, 
        self->content.header.id.low,
        self->content.header.id.high,
        self->content.header.label.buffer.data, 
        getClassExtension(self->content.header.type)
    );

    FILE *file = fopen(path, "wb");
    if (file == NULL) return false;

    StdEncoder encoder;
    stdEncoder(&encoder, file, NULL);

    printf("unpack: %s\n", path);
    encodeAssetFile((EncoderContext *)&encoder, self);

    fclose(file);

    return false;
}

static bool unpackVisitorLocalizationFile(PackVisitor *ctx, LocalizationFile *self) {
    char path[1024];

    snprintf(path, sizeof(path), "%s/Localizations", ctx->outputPath);
    mkdir(path, 0755);

    const char *fileName = strrchr(ctx->inputFile, '/');
    if (fileName) fileName += 1;
    else fileName = ctx->inputFile;

    snprintf(path, sizeof(path), "%s/Localizations/%s", 
        ctx->outputPath,
        fileName
    );

    FILE *file = fopen(path, "wb");
    if (file == NULL) return false;

    StdEncoder encoder;
    stdEncoder(&encoder, file, NULL);

    printf("unpack: %s\n", path);
    encodeLocalizationFile((EncoderContext *)&encoder, self);

    fclose(file);

    return false;
}

static bool unpackVisitorAssetReference(PackVisitor *ctx, AssetReference *self) {
    if (self->type == -1) return false;
    if (!self->first) return false;
    if (self->asset == 0) return false;

    AssetFile assetFile = REFERENCE_FILE;

    assetFile.content.header.id = self->id;
    assetFile.content.header.label = self->label;
    assetFile.content.header.type = self->type;
    assetFile.content.asset = self->asset;

    unpackVisitorAssetFile(ctx, &assetFile);

    self->first = false;

    return false;
}

VisitorContext PACK_VISITOR_CONTEXT = {
    .exitAssetReference = (void *)unpackVisitorAssetReference,
    .exitLocalizationFile = (void *)unpackVisitorLocalizationFile,
    .exitAssetFile = (void *)unpackVisitorAssetFile
};

int main(int argc, char **argv) {
    FILE *inFile = NULL;
    Arena arena = { 0 };
    AssetPool pool = { 0 };

    if (argc < 2) goto usage;

    const char *inputFile = argv[1];

    const char *ext = strrchr(inputFile, '.');
    if (ext == NULL) goto usage;

    bool isLoc = strcmp(ext, ".loc") == 0;

    inFile = fopen(inputFile, "rb");
    if (inFile == NULL) goto error;

    if (!poolNew(&pool, POOL_SIZE)) goto error;
    if (!arenaNew(&arena, ARENA_SIZE)) goto error;

    StdDecoder decoder;
    stdDecoder(&decoder, inFile, &pool, &arena);

    const char *outputPath = argc > 2 ? argv[2] : "out";
    mkdir(outputPath, 0755);

    PackVisitor visitor = {
        .ctx = PACK_VISITOR_CONTEXT,
        .inputFile = inputFile,
        .outputPath = outputPath,
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

    return 0;
usage:
    printf("usage: %s input_file [output_path]\n", argv[0]);

error:
    arenaDestroy(&arena);
    poolDestroy(&pool);

    if (inFile != NULL) fclose(inFile);

    return 1;
}
