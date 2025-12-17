#include <vicious/context.h>

static void stdDecoderError(StdDecoder *self, const char *scope, const char *message) {
    printf("%s: %s\n", scope, message);
}

static U32 stdDecoderTell(StdDecoder *self) {
    return ftell(self->file);
}

static void stdDecoderSeek(StdDecoder *self, U32 offset) {
    fseek(self->file, offset, SEEK_SET);
}

static void *stdDecoderGetId(StdDecoder *self, ID id) {
    return poolGet(self->pool, *(uint64_t *)&id);
}

static void stdDecoderSetId(StdDecoder *self, ID id, U32 typeId, void *asset) {
    poolInsert(self->pool, *(uint64_t *)&id, typeId, asset);
}

static void * stdDecoderAllocate(StdDecoder *self, U32 size, U32 count) {
    if (self->arena != NULL) {
        return arenaAllocate(self->arena, (size_t)size * (size_t)count);
    } else {
        return malloc((size_t)size * (size_t) count);
    }
}

static void stdDecoderRead(StdDecoder *self, void *ptr, U32 size, U32 count) {
    fread(ptr, size, count, self->file);
}

static DecoderContext STD_DECODER = {
    .error = (void *)stdDecoderError,
    .tell = (void *)stdDecoderTell,
    .seek = (void *)stdDecoderSeek,
    .getId = (void *)stdDecoderGetId,
    .setId = (void *)stdDecoderSetId,
    .allocate = (void *)stdDecoderAllocate,
    .read = (void *)stdDecoderRead
};

void stdDecoder(StdDecoder *self, FILE *file, AssetPool *pool, Arena *arena) {
    self->ctx = STD_DECODER;
    self->file = file;
    self->arena = arena;
    self->pool = pool;
}

static void stdEncoderError(StdEncoder *self, const char *scope, const char *message) {
    printf("%s: %s\n", scope, message);
}

static U32 stdEncoderTell(StdEncoder *self) {
    return ftell(self->file);
}

static void stdEncoderSeek(StdEncoder *self, U32 offset) {
    fseek(self->file, offset, SEEK_SET);
}

static void *stdEncoderGetId(StdEncoder *self, ID id) {
    return poolGet(self->pool, *(uint64_t *)&id);
}

static void stdEncoderWrite(StdEncoder *self, void *ptr, U32 size, U32 count) {
    fwrite(ptr, size, count, self->file);
}

static EncoderContext STD_ENCODER = {
    .error = (void *)stdEncoderError,
    .tell = (void *)stdEncoderTell,
    .seek = (void *)stdEncoderSeek,
    .getId = (void *)stdEncoderGetId,
    .write = (void *)stdEncoderWrite
};

void stdEncoder(StdEncoder *self, FILE *file, AssetPool *pool) {
    self->ctx = STD_ENCODER;
    self->file = file;
    self->pool = pool;
}
