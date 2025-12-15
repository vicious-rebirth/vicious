import { ClassCodec, field } from "../core";

import { I32, U32 } from "./atomic";
import { V18 } from "./v18";

export class V19 extends ClassCodec {
  __id = 19;

  base = field(V18);
  f_0x60 = field(I32);
  f_0x64 = field(U32);
}
