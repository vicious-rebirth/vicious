import { writeFile } from "fs/promises";
import { buildDecoderDeclaration, buildDecoderImplementation } from "./decoder";
import { buildTypes } from "./type";
import * as path from "path";
import { buildEncoderDeclaration, buildEncoderImplementation } from "./encoder";
import { buildVisitorDeclaration, buildVisitorImplementation } from "./visitor";
import { buildUtilDeclaration, buildUtilImplementation } from "./util";

async function main() {
  await Promise.all([
    writeFile(
      path.join(__dirname, "..", "include", "vicious", "generated.h"),
      [
        "#ifndef VICIOUS_GENERATED\n#define VICIOUS_GENERATED",
        buildTypes(),
        buildDecoderDeclaration(),
        buildEncoderDeclaration(),
        buildVisitorDeclaration(),
        buildUtilDeclaration(),
        "#endif",
      ].join("\n\n")
    ),

    writeFile(
      path.join(__dirname, "..", "src", "generated", "decoder.c"),
      ["#include <vicious/generated.h>", buildDecoderImplementation()].join(
        "\n\n"
      )
    ),
    writeFile(
      path.join(__dirname, "..", "src", "generated", "encoder.c"),
      ["#include <vicious/generated.h>", buildEncoderImplementation()].join(
        "\n\n"
      )
    ),
    writeFile(
      path.join(__dirname, "..", "src", "generated", "visitor.c"),
      ["#include <vicious/generated.h>", buildVisitorImplementation()].join(
        "\n\n"
      )
    ),

    writeFile(
      path.join(__dirname, "..", "src", "generated", "util.c"),
      ["#include <vicious/generated.h>", buildUtilImplementation()].join("\n\n")
    ),
  ]);
}

main();
