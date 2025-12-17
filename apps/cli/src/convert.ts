import {
  ArrayBufferReader,
  ArrayBufferWriter,
  AssetStore,
  Decoder,
  Encoder,
} from "@repo/js";
import { parseArgs } from "util";
import { readFile, writeFile } from "fs/promises";

async function main(): Promise<void> {
  const { values } = parseArgs({
    options: {
      input: { type: "string", short: "i" },
      output: { type: "string", short: "o" },
    },
  });

  const { input, output } = values;

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
    encoder.encodeAssetFile(out);
  }

  await writeFile(output || "out.bin", new DataView(buffer));
}

main();
