#include <cJSON.h>
#include <vicious.h>

#include <stdio.h>
#include <string.h>

#define ARENA_SIZE 32 * 1024 * 1024
#define POOL_SIZE 8192

#ifdef DISABLE_LOG
#define LOG(format, ...)
#else
#define LOG(format, ...) printf(format, __VA_ARGS__)
#endif

typedef struct {
    VisitorContext ctx;

    cJSON *nodes[255];
    uint8_t ptr;

    U32 type;
} Visitor;

static bool jsonEnterField(Visitor *ctx, const char *name, I32 idx) {
    cJSON *next;
    if (idx >= 0) {
        cJSON *arr = cJSON_GetObjectItem(ctx->nodes[ctx->ptr], name);
        next = cJSON_GetArrayItem(arr, idx);
    } else {
        next = cJSON_GetObjectItem(ctx->nodes[ctx->ptr], name);
    }

    if (next == NULL) return false;

    ctx->nodes[++ctx->ptr] = next;

    return true;
}

static void jsonExitField(Visitor *ctx, const char *name, I32 idx) {
    ctx->ptr--;
}

static bool jsonEnterType(Visitor *ctx, const char *name) {
    // Skip metadata
    if (strncmp(name, "Metadata", 8) == 0) return false;

    return true;
}

static void jsonVisitBOOL(Visitor *ctx, BOOL *self) {
    *self = cJSON_GetNumberValue(ctx->nodes[ctx->ptr]);
}

static void jsonVisitF32(Visitor *ctx, F32 *self) {
    *self = cJSON_GetNumberValue(ctx->nodes[ctx->ptr]);
}

static void jsonVisitI8(Visitor *ctx, I8 *self) {
    *self = cJSON_GetNumberValue(ctx->nodes[ctx->ptr]);
}

static void jsonVisitI16(Visitor *ctx, I16 *self) {
    *self = cJSON_GetNumberValue(ctx->nodes[ctx->ptr]);
}

static void jsonVisitI32(Visitor *ctx, I32 *self) {
    *self = cJSON_GetNumberValue(ctx->nodes[ctx->ptr]);
}

static void jsonVisitU8(Visitor *ctx, U8 *self) {
    *self = cJSON_GetNumberValue(ctx->nodes[ctx->ptr]);
}

static void jsonVisitU16(Visitor *ctx, U16 *self) {
    *self = cJSON_GetNumberValue(ctx->nodes[ctx->ptr]);
}

static void jsonVisitU32(Visitor *ctx, U32 *self) {
    *self = cJSON_GetNumberValue(ctx->nodes[ctx->ptr]);
}

static bool jsonEnterID(Visitor *ctx, ID *self) {
    sscanf(cJSON_GetStringValue(ctx->nodes[ctx->ptr]), "%08X%08X", &self->low, &self->high);

    return false;
}

static void jsonVisitANY(Visitor *ctx, ANY *self) {
    // LOG("ANY\n", "");
}

static bool jsonEnterLabelID(Visitor *ctx, LabelID *self) {
    U32 index, unique;

    sscanf(cJSON_GetStringValue(ctx->nodes[ctx->ptr]), "%04X%04X", &index, &unique);

    self->index = index;
    self->unique = unique;
 
    return false;
}

static bool jsonEnterStringID(Visitor *ctx, StringID *self) {
    U32 index, unique;

    sscanf(cJSON_GetStringValue(ctx->nodes[ctx->ptr]), "%04X%04X", &index, &unique);

    self->index = index;
    self->unique = unique;

    return false;
}

static bool jsonEnterStringBuffer(Visitor *ctx, StringBuffer *self) {
    return false;
}

static bool jsonEnterAssetFile(Visitor *ctx, AssetFile *self) {
    ctx->ctx.enterField((void *)ctx, "version", -1);
    visitU32((void *)ctx, &self->version);
    ctx->ctx.exitField((void *)ctx, "version", -1);

    ctx->ctx.enterField((void *)ctx, "content", -1);
    visitAssetFileContent((void *)ctx, &self->content);
    ctx->ctx.exitField((void *)ctx, "content", -1);

    return false;
}

static bool jsonEnterLocalizationFile(Visitor *ctx, LocalizationFile *self) {
    ctx->ctx.enterField((void *)ctx, "version", -1);
    visitU32((void *)ctx, &self->version);
    ctx->ctx.exitField((void *)ctx, "version", -1);

    ctx->ctx.enterField((void *)ctx, "content", -1);
    visitLocalization((void *)ctx, &self->content);
    ctx->ctx.exitField((void *)ctx, "content", -1);

    return false;
}


VisitorContext VISITOR_CONTEXT = {
    .enterField = (void *)jsonEnterField,
    .exitField = (void *)jsonExitField,
    .enterType = (void *)jsonEnterType,

    .visitBOOL = (void *)jsonVisitBOOL,
    .visitU8 = (void *)jsonVisitU8,
    .visitI8 = (void *)jsonVisitI8,
    .visitU16 = (void *)jsonVisitU16,
    .visitI16 = (void *)jsonVisitI16,
    .visitU32 = (void *)jsonVisitU32,
    .visitI32 = (void *)jsonVisitI32,
    .visitF32 = (void *)jsonVisitF32,
    .visitANY = (void *)jsonVisitANY,

    .enterID = (void *)jsonEnterID,
    .enterLabelID = (void *)jsonEnterLabelID,
    .enterStringID = (void *)jsonEnterStringID,
    .enterStringBuffer = (void *)jsonEnterStringBuffer,

    .enterAssetFile = (void *)jsonEnterAssetFile,
    .enterLocalizationFile = (void *)jsonEnterLocalizationFile,

};

int main(int argc, char **argv) {
    int result = 0;

    FILE *inFile = NULL;
    FILE *outFile = NULL;

    char *json = NULL;
    cJSON *root = NULL;

    Arena arena = { 0 };
    AssetPool pool = { 0 };

    if (argc < 2) goto usage;

    const char *filePath = argv[1];

    const char *ext = strrchr(filePath, '.');
    if (ext == NULL) goto usage;

    inFile = fopen(filePath, "rb");
    if (inFile == NULL) goto error;

    fseek(inFile, 0, SEEK_END);
    size_t inSize = ftell(inFile);
    fseek(inFile, 0, SEEK_SET);

    json = malloc(inSize);
    if (json == NULL) goto error;

    fread(json, 1, inSize, inFile);

    const char *outPath = argc > 2 ? argv[2] : "out.vcs";
    
    outFile = fopen(outPath, "wb");
    if (outFile == NULL) goto error;

    root = cJSON_Parse(json);
    if (root == NULL) goto error;

    if (!poolNew(&pool, POOL_SIZE)) goto error;
    if (!arenaNew(&arena, ARENA_SIZE)) goto error;

    Visitor visitor = {
        .ctx = VISITOR_CONTEXT,
        .nodes = { root },
        .ptr = 0,
    };

    bool isLoc = true;

    if (isLoc) {
        LocalizationFile locFile;
        visitLocalizationFile((VisitorContext *)&visitor, &locFile);
    } else {
        AssetFile assetFile;
        visitAssetFile((VisitorContext *)&visitor, &assetFile);
    }

    goto cleanup;

usage:
    printf("usage: %s file [out_vcs]\n", argv[0]);

error:
    result = 1;

cleanup:
    arenaDestroy(&arena);
    poolDestroy(&pool);

    if (json != NULL) free(json);
    if (root != NULL) cJSON_Delete(root);

    if (inFile != NULL) fclose(inFile);
    if (outFile != NULL) fclose(outFile);

    return result;
}
