import { readFile, writeFile } from "fs/promises";
import { parseArgs } from "util";

import {
  ArrayBufferReader,
  ArrayBufferWriter,
  AssetStore,
  Decoder,
  Encoder,
} from "@repo/js";

async function main(): Promise<void> {
  const { positionals } = parseArgs({
    allowPositionals: true,
  });

  const [input, output] = positionals;

  if (!input || !output) {
    console.log(`usage: test input_file output_file`);

    return;
  }

  const store = new AssetStore();

  const inFile = await readFile(input!);

  const reader = new ArrayBufferReader(inFile.buffer, store);
  const decoder = new Decoder(reader);

  const buffer = new ArrayBuffer(inFile.buffer.byteLength);
  const writer = new ArrayBufferWriter(buffer, store);
  const encoder = new Encoder(writer);

  if (input!.endsWith("loc")) {
    const out = decoder.decodeLocalizationFile();
    encoder.encodeLocalizationFile(out);
  } else {
    const out = decoder.decodeAssetFile();
    debugger;
    encoder.encodeAssetFile(out);
  }

  await writeFile(output || "out.bin", new DataView(buffer));
}

main();
