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

    const char *field;
} Visitor;

static bool jsonEnterField(Visitor *ctx, const char *name, I32 idx) {
    ctx->field = name;

    if (idx == 0) {
        ctx->nodes[++ctx->ptr] = cJSON_AddArrayToObject(ctx->nodes[ctx->ptr], name);
    } else if (idx < 0) {
        if (cJSON_IsArray(ctx->nodes[ctx->ptr])) ctx->ptr--;
    }

    cJSON *next;
    if (idx >= 0) {
        next = cJSON_CreateObject();
        cJSON_AddItemToArray(ctx->nodes[ctx->ptr], next);
    } else {
        next = cJSON_AddObjectToObject(ctx->nodes[ctx->ptr], name);
    }

    ctx->nodes[++ctx->ptr] = next;

    return true;
}

static void jsonExitField(Visitor *ctx, const char *name, I32 idx) {
    if (cJSON_IsArray(ctx->nodes[ctx->ptr])) ctx->ptr--;
    ctx->ptr--;
}

static bool jsonEnterType(Visitor *ctx, const char *name) {
    // Skip metadata
    if (strncmp(name, "Metadata", 8) == 0) return false;

    return true;
}

static void jsonVisitBOOL(Visitor *ctx, BOOL *self) {
    cJSON_ReplaceItemInObject(ctx->nodes[ctx->ptr - 1], ctx->field, cJSON_CreateBool(*self));
}

static void jsonVisitF32(Visitor *ctx, F32 *self) {
    cJSON_ReplaceItemInObject(ctx->nodes[ctx->ptr - 1], ctx->field, cJSON_CreateNumber(*self));
}

static void jsonVisitI8(Visitor *ctx, I8 *self) {
    cJSON_ReplaceItemInObject(ctx->nodes[ctx->ptr - 1], ctx->field, cJSON_CreateNumber(*self));
}

static void jsonVisitI16(Visitor *ctx, I16 *self) {
    cJSON_ReplaceItemInObject(ctx->nodes[ctx->ptr - 1], ctx->field, cJSON_CreateNumber(*self));
}

static void jsonVisitI32(Visitor *ctx, I32 *self) {
    cJSON_ReplaceItemInObject(ctx->nodes[ctx->ptr - 1], ctx->field, cJSON_CreateNumber(*self));
}

static void jsonVisitU8(Visitor *ctx, U8 *self) {
    cJSON_ReplaceItemInObject(ctx->nodes[ctx->ptr - 1], ctx->field, cJSON_CreateNumber(*self));
}

static void jsonVisitU16(Visitor *ctx, U16 *self) {
    cJSON_ReplaceItemInObject(ctx->nodes[ctx->ptr - 1], ctx->field, cJSON_CreateNumber(*self));
}

static void jsonVisitU32(Visitor *ctx, U32 *self) {
    cJSON_ReplaceItemInObject(ctx->nodes[ctx->ptr - 1], ctx->field, cJSON_CreateNumber(*self));
}

static bool jsonEnterID(Visitor *ctx, ID *self) {
    char buffer[17];

    snprintf(buffer, sizeof(buffer), "%08X%08X", self->low, self->high);

    cJSON_ReplaceItemInObject(ctx->nodes[ctx->ptr - 1], ctx->field, cJSON_CreateString(buffer));

    return false;
}

static bool jsonEnterLabelID(Visitor *ctx, LabelID *self) {
    char buffer[17];

    snprintf(buffer, sizeof(buffer), "%04X%04X", self->index, self->unique);

    cJSON_ReplaceItemInObject(ctx->nodes[ctx->ptr - 1], ctx->field, cJSON_CreateString(buffer));

    return false;
}

static bool jsonEnterStringID(Visitor *ctx, StringID *self) {
    char buffer[17];

    snprintf(buffer, sizeof(buffer), "%04X%04X", self->index, self->unique);

    cJSON_ReplaceItemInObject(ctx->nodes[ctx->ptr - 1], ctx->field, cJSON_CreateString(buffer));

    return false;
}

static bool jsonEnterStringBuffer(Visitor *ctx, StringBuffer *self) {
    cJSON *next;

    if (self->size == 0) next = cJSON_CreateNull(); 
    else next = cJSON_CreateString(self->data);

    cJSON_ReplaceItemInObject(ctx->nodes[ctx->ptr - 1], ctx->field, next);

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

    cJSON *root = NULL;

    Arena arena = { 0 };
    AssetPool pool = { 0 };

    if (argc < 2) goto usage;

    const char *filePath = argv[1];

    const char *ext = strrchr(filePath, '.');
    if (ext == NULL) goto usage;

    bool isLoc = strcmp(ext, ".loc") == 0;

    inFile = fopen(filePath, "rb");
    if (inFile == NULL) goto error;

    const char *outPath = argc > 2 ? argv[2] : "out.json";
    
    outFile = fopen(outPath, "wb");
    if (outFile == NULL) goto error;

    root = cJSON_CreateObject();
    if (root == NULL) goto error;

    if (!poolNew(&pool, POOL_SIZE)) goto error;
    if (!arenaNew(&arena, ARENA_SIZE)) goto error;

    StdDecoder decoder;
    stdDecoder(&decoder, inFile, &pool, &arena);

    Visitor visitor = {
        .ctx = VISITOR_CONTEXT,
        .nodes = { root },
        .ptr = 0,
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

    char *str = cJSON_PrintUnformatted(root);
    if (str == NULL) goto error;

    fwrite(str, 1, strlen(str), outFile);

    free(str);

    goto cleanup;

usage:
    printf("usage: %s file [out_json]\n", argv[0]);

error:
    result = 1;

cleanup:
    arenaDestroy(&arena);
    poolDestroy(&pool);

    if (root != NULL) cJSON_Delete(root);

    if (inFile != NULL) fclose(inFile);
    if (outFile != NULL) fclose(outFile);

    return result;
}
