import { ClassCodec, field } from "../core";

import { U32 } from "./atomic";
import { V343 } from "./v343";

export class V345 extends ClassCodec {
  __id = 345;

  base = field(V343);
  f_0x60 = field(U32);
}
