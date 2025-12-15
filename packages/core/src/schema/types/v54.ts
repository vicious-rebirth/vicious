import { ClassCodec, field } from "../core";

import { U32 } from "./atomic";
import { V18 } from "./v18";

export class V54 extends ClassCodec {
  __id = 54;

  base = field(V18);
  f_0x60 = field(U32);
}
