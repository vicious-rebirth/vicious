import * as schema from "@repo/core/schema";
import { Decoder } from "./decoder";

const file = new schema.U8Buffer();

const backend = new Decoder();
backend.visit(file);

console.log(backend.getOutput());
