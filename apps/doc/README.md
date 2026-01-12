# Doc

Doxygen documentation of `@repo/core` types.

## Build

```sh
pnpm codegen
pnpm build
```

HTML website will be generated at `out/html`.

## Usage

From build, easiest way to display is with Python:

```sh
cd out/html
python -m http.server
```

Doxygen files will be served at http://localhost:8000
