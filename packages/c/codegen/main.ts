import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import * as path from "path";

import { buildDecoderDeclaration, buildDecoderImplementation } from "./decoder";
import { buildEncoderDeclaration, buildEncoderImplementation } from "./encoder";
import { buildEnum } from "./enum";
import { buildFreeDeclaration, buildFreeImplementation } from "./free";
import { buildTypes } from "./type";
import { buildUtilDeclaration, buildUtilImplementation } from "./util";
import { buildVisitorDeclaration, buildVisitorImplementation } from "./visitor";

async function main() {
  const generatedFolder = path.join(__dirname, "..", "src", "generated");
  if (!existsSync(generatedFolder)) {
    await mkdir(generatedFolder, { recursive: true });
  }

  await Promise.all([
    writeFile(
      path.join(__dirname, "..", "include", "vicious", "generated.h"),
      [
        "#ifndef VICIOUS_GENERATED\n#define VICIOUS_GENERATED",
        buildTypes(),
        buildEnum(),
        buildDecoderDeclaration(),
        buildEncoderDeclaration(),
        buildVisitorDeclaration(),
        buildFreeDeclaration(),
        buildUtilDeclaration(),
        "#endif",
      ].join("\n\n")
    ),

    writeFile(
      path.join(generatedFolder, "decoder.c"),
      ["#include <vicious/generated.h>", buildDecoderImplementation()].join(
        "\n\n"
      )
    ),
    writeFile(
      path.join(generatedFolder, "encoder.c"),
      ["#include <vicious/generated.h>", buildEncoderImplementation()].join(
        "\n\n"
      )
    ),
    writeFile(
      path.join(generatedFolder, "free.c"),
      [
        "#include <vicious/generated.h>",
        "#include <stdlib.h>",
        buildFreeImplementation(),
      ].join("\n\n")
    ),
    writeFile(
      path.join(generatedFolder, "visitor.c"),
      ["#include <vicious/generated.h>", buildVisitorImplementation()].join(
        "\n\n"
      )
    ),

    writeFile(
      path.join(generatedFolder, "util.c"),
      ["#include <vicious/generated.h>", buildUtilImplementation()].join("\n\n")
    ),
  ]);
}

main();
