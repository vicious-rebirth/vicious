#ifndef VICIOUS_CONTEXT
#define VICIOUS_CONTEXT

#include <stdio.h>

#include "./generated.h"
#include "./memory.h"

typedef struct {
    DecoderContext ctx;

    FILE *file;
    Arena *arena;
    AssetPool *pool;
} StdDecoder;

typedef struct {
    EncoderContext ctx;

    FILE *file;
    AssetPool *pool;
} StdEncoder;

/**
 * Create a libc DecoderContext
 *
 * Arena is NULLable
 */
void stdDecoder(StdDecoder *ctx, FILE *file, AssetPool *pool, Arena *arena);

/**
 * Create a libc EncoderContext
 */
void stdEncoder(StdEncoder *ctx, FILE *file, AssetPool *pool);

#endif
