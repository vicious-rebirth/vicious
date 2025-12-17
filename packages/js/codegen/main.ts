import { writeFileSync } from "fs";
import path from "path";

import { buildDecoder } from "./decoder";
import { buildEncoder } from "./encoder";
import { buildTypes } from "./type";
import { buildVisitor } from "./visitor";
import { buildUtils } from "./util";

function main() {
  const out = [
    buildTypes(),
    buildDecoder(),
    buildEncoder(),
    buildVisitor(),
    buildUtils(),
  ];

  writeFileSync(
    path.join(__dirname, "..", "src", "generated.ts"),
    out.join("\n\n")
  );
}

main();
