import { Class, field } from "../core";
import { U32 } from "./atomic";
import { V109 } from "./v109";

export class V159 extends Class {
  __id = 159;
  __offset = 0x5a7d0;

  base = field(V109);
  f_0x04 = field(U32);
  f_0x08 = field(U32);
}
