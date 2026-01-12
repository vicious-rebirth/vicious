# Texture

CLI tooling to convert proprietary files (`.txr`) to a more modern/free format (`.dds`).

## Tools

### txr2dds

Converts a texture (`.txr`) to DirectDraw Surface (`.dds`).

#### Usage

```
txr2dds txr_file [dds_file]
```

- txr_file: Input path to `.txr` file
- (Optional) dds_file: Output path to `.dds` file (defaults to `out.dds`)

### dds2txr

Injects DirectDraw Surface data (`.dds`) into a texture file (`.txr`)

#### Usage

```
dds2txr dds_file in_txr_file [out_txr_file]
```

- dds_file: Input path to `.dds` file
- in_txr_file: Reference `.txr` file to inject into
- (Optional) out_txr_file: Output path to `.txr` file (defaults to `out.txr`)

## FAQ

### Why do some .dds files not work?

Modern DirectX dropped supports for `DDPF_PALETTEINDEXED8` because that's not how modern graphic cards work anymore. You'll likely have to use an old version of `texconv` to make it work.

As of writing, I'm considering making a `txr2png` tool. It's just that it's much trickier to make a `png2txr` tool.

### Why do some/all .dds look corrupted?

Textures seem to differ per platform. There is probably another field I didn't account for aswell. Would love someone to figure this one out, but for now Xbox is likely the only mostly working platform.
