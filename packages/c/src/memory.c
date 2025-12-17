#include <vicious/memory.h>

#include <string.h>
#include <stdlib.h>

bool arenaNew(Arena *arena, size_t capacity) {
    arena->base = malloc(capacity);
    if (arena->base == NULL) return false;

    arena->size = 0;
    arena->capacity = capacity;

    return true;
}

void arenaClear(Arena *arena) {
    memset(arena->base, 0, arena->capacity);

    arena->size = 0;
}

void arenaDestroy(Arena *arena) {
    if (arena->base == NULL) return;

    free(arena->base);
    arena->base = NULL;
}

void *arenaAllocate(Arena *arena, size_t size) {
    if (arena->size + size >= arena->capacity) return NULL;

    void *ptr = arena->base + arena->size;
    arena->size += size;

    return ptr;
}

bool poolNew(AssetPool *pool, size_t capacity) {
    pool->entries = malloc(sizeof(AssetPoolEntry) * capacity);
    if (pool->entries == NULL) return false;

    pool->count = 0;
    pool->capacity = capacity;

    return true;
}

bool poolResize(AssetPool *pool, size_t capacity) {
    if (pool->count > capacity) return false;

    AssetPool tmp;
    if (!poolNew(&tmp, capacity)) return false;

    for (size_t i = 0; i < pool->capacity; i++) {
        AssetPoolEntry *entry = &pool->entries[i];
        if (entry->state != 1) continue;

        poolInsert(&tmp, entry->id, entry->type, entry->asset);
    }

    poolDestroy(pool);

    pool->entries = tmp.entries;

    return true;
}

void poolDestroy(AssetPool *pool) {
    if (pool->entries == NULL) return;

    free(pool->entries);
    pool->entries = NULL;
}

void poolLink(AssetPool *src, AssetPool *dest) {
    src->parent = dest;
}

size_t poolKey(const AssetPool *pool, uint64_t id) {
    return id % pool->capacity;
}

void *poolGet(const AssetPool *pool, uint64_t id) {
    size_t key = poolKey(pool, id);

    const AssetPool *poolPtr = pool;
    while (poolPtr != NULL) {
        for (size_t i = 0; i < pool->capacity; i++) {
            AssetPoolEntry *entry = &pool->entries[(i + key) % pool->capacity];
            if (entry->state == 0) break;

            if (
                entry->state == 1
                && entry->id == id
            ) return entry->asset;
        }

        poolPtr = poolPtr->parent;
    }

    return NULL;
}

bool poolInsert(AssetPool *pool, uint64_t id, uint32_t type, void *asset) {
    if (pool->count >= pool->capacity) return 0;

    size_t key = poolKey(pool, id);

    for (size_t i = 0; i < pool->capacity; i++) {
        AssetPoolEntry *entry = &pool->entries[(i + key) % pool->capacity];
        if (entry->state == 1) continue;

        entry->state = 1;
        entry->id = id;
        entry->type = type;
        entry->asset = asset;

        pool->count += 1;

        return true;
    }

    return false;
}

bool poolDelete(AssetPool *pool, uint64_t id) {
    if (pool->count <= 0) return 0;

    size_t key = poolKey(pool, id);

    for (uint32_t i = 0; i < pool->capacity; i++) {
        AssetPoolEntry *entry = &pool->entries[(i + key) % pool->capacity];
        if (entry->state == 0) break;

        if (
            entry->id == id
        ) {
            entry->state = 2;

            return 1;
        }
    }

    return 0;
}

void poolClear(AssetPool *pool) {
    for (size_t i = 0; i < pool->capacity; i++) {
        pool->entries[i].state = 0;
    }

    pool->count = 0;
}
