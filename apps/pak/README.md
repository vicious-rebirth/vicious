# Pack

CLI tooling to handle `data.pak` files.

## Tools

### pakbuild

Builds a `data.pak` from a root folder recursively.

#### Usage

```
pakbuild folder [out_pak]
```

- folder: Path to root folder
- (Optional) out_path: Path to `data.pak` (defaults to `data.pak`)

### pakdump

Extracts files from a `data.pak` file.

#### Usage

```
pakdump file [out_path]
```

- file: Path to data.pak
- (Optional) out_path: Path to root folder to unpack into (defaults to `out`)
