# Pack

CLI tooling to pack/unpack multi-asset files (`.gam`, `.map`, etc) into individual asset files (`.snd`, `.ms`, etc).

By default, most released games have very heavy asset files that makes it hard to work with. These tools should make it much more manageable. I suspect the unpacked format is very similar to how the original developers worked with asset files.

## Tools

### pack

Packages an unpacked asset file into a single multi-asset file.

It searches through a unpacked asset folder for files that matches the IDs it's expected.

Note: This tool expects `unpack` to have been run before.

#### Usage

```
pack file_path [project_path]
```

- file_path: Path to unpacked asset file
- (Optional) project_path: Path to root folder with unpacked assets from `unpack` (defaults to `out`)

### unpack

Unpackages a multi-asset packed file into folder-sorted individual unpacked asset files.

#### Usage

```
unpack file_path [project_path]
```

- file_path: Path to packed asset file
- (Optional) project_path: Path to root folder to put files into (defaults to `out`)
