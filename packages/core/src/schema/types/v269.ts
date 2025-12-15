import { ClassCodec, field } from "../core";

import { U8 } from "./atomic";
import { V260 } from "./v260";

export class V269 extends ClassCodec {
  __id = 269;

  base = field(V260);
  f_0x10 = field(U8);
}
