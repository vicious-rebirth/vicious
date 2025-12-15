import { ClassCodec, field } from "../core";

import { U32 } from "./atomic";
import { V108 } from "./v108";
import { V301 } from "./v301";

export class V164 extends ClassCodec {
  __id = 164;

  base = field(V108);
  f_1 = field(V301);
  f_0x30 = field(U32);
  f_0x34 = field(U32);
}
