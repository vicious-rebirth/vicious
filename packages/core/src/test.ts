import * as schema from "./schema";
import { TSDecoder } from "./backend/codec/ts";

const file = new schema.U8Buffer();

const backend = new TSDecoder();
backend.visit(file);

console.log(backend.getOutput());
