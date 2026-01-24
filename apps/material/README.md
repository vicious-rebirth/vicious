# Mesh

CLI tooling to convert proprietary files (`.mtl`) to a more modern/free format (`.gltf`, `.glb`).

## Tools

### ms2gltf

Converts a material set (`.ms`) to glTF (`.gltf`/`.glb`).

#### Usage

```
mtl2gltf ms_file [gltf_file]
```

- ms_file: Input path to `.ms` file
- (Optional) gltf_file: Output path to `.gltf`/`.glb` file (defaults to `out.glb`)

### mtl2gltf

Converts a material (`.mtl`) to glTF (`.gltf`/`.glb`).

#### Usage

```
mtl2gltf mtl_file [gltf_file]
```

- mtl_file: Input path to `.mtl` file
- (Optional) gltf_file: Output path to `.gltf`/`.glb` file (defaults to `out.glb`)
