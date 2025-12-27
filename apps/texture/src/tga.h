#ifndef VICIOUS_TGA
#define VICIOUS_TGA

#include <stdint.h>

typedef enum {
    TGA_COLORMAP = 1,
    TGA_GRAY = 3,
} TGADT;

typedef struct __attribute__((packed)) {
    uint8_t idLength;
    uint8_t colorMapType;
    uint8_t dataTypeCode;
    uint16_t colorMapOrigin;
    uint16_t colorMapLength;
    uint8_t colorMapBlockSize;
    uint16_t xOrigin;
    uint16_t yOrigin;
    uint16_t width;
    uint16_t height;
    uint8_t bitsPerPixel;
    uint8_t imageDescriptor;
} TGA_HEADER;

#endif
