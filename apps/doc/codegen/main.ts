import { writeFile } from "fs/promises";
import * as path from "path";

import { buildDocumentation } from "./doc";

async function main() {
  const targetFolder = path.join(__dirname, "..");

  await Promise.all([
    writeFile(path.join(targetFolder, "doc.h"), buildDocumentation()),
  ]);
}

main();
