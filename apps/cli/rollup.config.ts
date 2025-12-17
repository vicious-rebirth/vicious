import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig({
  input: {
    convert: "src/convert.ts",
  },
  output: {
    dir: "dist",
    format: "cjs",
    chunkFileNames: "[name].js",
  },
  plugins: [
    resolve({
      extensions: [".js", ".ts"],
      resolveOnly: [/^@repo/],
    }),
    typescript({ rootDir: "../.." }),
  ],
});
