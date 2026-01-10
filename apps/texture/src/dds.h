#ifndef VICIOUS_DDS
#define VICIOUS_DDS

#include <stdint.h>

typedef enum {
    DDPF_ALPHAPIXELS        = 0x1,
    DDPF_ALPHA              = 0x2,
    DDPF_FOURCC             = 0x4,
    DDPF_PALETTEINDEXED8    = 0x20,
    DDPF_RGB                = 0x40,
} DDPF;

typedef struct __attribute__((packed)) {
    uint32_t size;
    uint32_t flags;
    char fourCC[4];
    uint32_t rgbBitCount;
    uint32_t rBitMask;
    uint32_t gBitMask;
    uint32_t bBitMask;
    uint32_t aBitMask;
} DDS_PIXELFORMAT;

typedef enum {
    DDSD_CAPS = 0x1,
    DDSD_HEIGHT = 0x2,
    DDSD_WIDTH = 0x4,
    DDSD_PITCH = 0x8,
    DDSD_PIXELFORMAT = 0x1000,
    DDSD_MIPMAPCOUNT = 0x20000,
    DDSD_LINEARSIZE = 0x80000,
} DDSD;

typedef enum {
    DDSCAPS_COMPLEX	=	0x8,
    DDSCAPS_MIPMAP	=	0x400000,
    DDSCAPS_TEXTURE	=	0x1000
} DDSCAPS;

typedef struct  __attribute__((packed)) {
    char magic[4];
    uint32_t size;
    uint32_t flags;
    uint32_t height;
    uint32_t width;
    uint32_t pitchOrLinearSize;
    uint32_t depth;
    uint32_t mipMapCount;
    uint32_t reserved1[11];
    DDS_PIXELFORMAT ddspf;
    uint32_t caps;
    uint32_t caps2;
    uint32_t caps3;
    uint32_t caps4;
    uint32_t reserved2;
} DDS_HEADER;

#endif
