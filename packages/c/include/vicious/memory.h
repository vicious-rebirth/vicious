#ifndef VICIOUS_MEMORY
#define VICIOUS_MEMORY

#include <stdbool.h>
#include <stdint.h>
#include <stdlib.h>

typedef struct {
    void *base;
    size_t size;
    size_t capacity;
} Arena;

/**
 * Creates new arena on heap
 */
bool arenaNew(Arena *arena, size_t capacity);

/**
 * Empties the arean
 */
void arenaClear(Arena *arena);

/**
 * Frees an arena
 */
void arenaDestroy(Arena *arena);

/**
 * Allocate size to arena
 */
void *arenaAllocate(Arena *arena, size_t size);

typedef struct {
    uint8_t state; // 0 empty, 1 used, other is deleted
    uint64_t id;
    uint32_t type;
    void *asset;
} AssetPoolEntry;

typedef struct AssetPool {
    struct AssetPool *parent;
    AssetPoolEntry *entries;
    size_t count;
    size_t capacity;
} AssetPool;

/**
 * Creates new pool on heap
 */
bool poolNew(AssetPool *pool, size_t capacity);

/**
 * Resized a pool to a new capacity
 */
bool poolResize(AssetPool *pool, size_t capacity);

/**
 * Frees a pool
 */
void poolDestroy(AssetPool *pool);

/**
 * Links a child pool to a parent
 */
void poolLink(AssetPool *src, AssetPool *dest);

/**
 * Get asset from a pool using ID
 */
void *poolGet(const AssetPool *pool, uint64_t id);

/**
 * Insert asset into pool using ID
 *
 * WARN: Does not check for duplicated, do poolGet first to prevent collision
 */
bool poolInsert(AssetPool *pool, uint64_t id, uint32_t type, void *asset);

/**
 * Delete asset from pool using ID
 */
bool poolDelete(AssetPool *pool, uint64_t id);

/**
 * Empties the pool
 */
void poolClear(AssetPool *pool);

#endif
