import { ClassCodec, field } from "../core";

import { U32 } from "./atomic";
import { V109 } from "./v109";

export class V159 extends ClassCodec {
  __id = 159;

  base = field(V109);
  f_0x04 = field(U32);
  f_0x08 = field(U32);
}
