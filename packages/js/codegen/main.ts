import { writeFileSync } from "fs";
import path from "path";

import { buildDecoder } from "./decoder";
import { buildEncoder } from "./encoder";
import { buildTypes } from "./type";
import { buildUtils } from "./util";
import { buildVisitor } from "./visitor";

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
