#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include <sys/stat.h>

#ifdef DISABLE_LOG
#define LOG(format, ...)
#else
#define LOG(format, ...) printf(format, __VA_ARGS__)
#endif

bool mkdirs(const char *file, int mode) {
    char path[1024];

    strncpy(path, file, sizeof(path) - 1);
    path[sizeof(path) - 1] = '\0';

    for (char *p = path; *p; p++) {
        if (*p != '/') continue;

        *p = '\0';

        mkdir(path, mode);

        *p = '/';
    }

    return true;
}

bool dump(FILE *file, const char *folder) {
    char path[1024];

    uint32_t count;
    fread(&count, sizeof(count), 1, file);

    uint32_t version;
    fread(&version, sizeof(version), 1, file);

    fseek(file, 0x800, SEEK_SET);

    char suffix[40];
    uint32_t offset;
    uint32_t size;

    for (uint32_t i = 0; i < count; i++) {
        fread(suffix, sizeof(suffix), 1, file);
        snprintf(path, sizeof(path), "%s/%s", folder, suffix);

        mkdirs(path, 0755);

        fread(&offset, sizeof(offset), 1, file);
        offset *= 0x800;

        fread(&size, sizeof(size), 1, file);

        LOG("dump: %s\n", path);

        FILE *out = fopen(path, "wb");
        if (out == NULL) return false;

        void *buffer = malloc(size);
        if (buffer == NULL) return false;

        size_t ptr = ftell(file);
        
        fseek(file, offset, SEEK_SET);

        fread(buffer, 1, size, file);
        fwrite(buffer, 1, size, out);

        free(buffer);
        fclose(out);

        fseek(file, ptr, SEEK_SET);
    }

    return true;
}

int main(int argc, char **argv) {
    FILE *inFile = NULL;

    if (argc < 2) goto usage;

    const char *filePath = argv[1];

    inFile = fopen(filePath, "r");
    if (inFile == NULL) goto error;

    const char *outPath = argc > 2 ? argv[2] : "out";
    mkdir(outPath, 0755);

    if (!dump(inFile, outPath)) goto error;

    fclose(inFile);

    return 0;
usage:
    printf("usage: %s file [out_path]\n", argv[0]);

error:
    if (inFile != NULL) fclose(inFile);

    return 1;
}
