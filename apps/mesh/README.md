# Mesh

CLI tooling to convert proprietary files (`.msh`) to a more modern/free format (`.gltf`, `.glb`).

## Tools

### msh2gltf

Converts a mesh (`.msh`) to glTF (`.gltf`/`.glb`).

#### Usage

```
msh2gltf msh_file [gltf_file]
```

- msh_file: Input path to `.msh` file
- (Optional) gltf_file: Output path to `.gltf`/`.glb` file (defaults to `out.glb`)

## FAQ

### Why do meshes come out in weird colors?

Meshes don't actually store and material/texture data directly. glTF expects materials to be set in the file to work correctly. To make it easier to differentiate between mesh sections, I added different colors to each material.

As of writing, I didn't create a tool to combine a MaterialSet with a Mesh.

### Why are .gltf files empty?

As of writing, I didn't add the `out.bin` file writing. You should really only be using `out.glb` until then.
