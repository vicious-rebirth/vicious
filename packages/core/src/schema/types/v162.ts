import { ClassCodec, field } from "../core";

import { F32, U32 } from "./atomic";
import { Base } from "./base";

export class V162 extends ClassCodec {
  __id = 162;

  base = field(Base);
  f_1 = field(U32);
  f_2 = field(U32);
  f_0xc = field(F32);
  f_0x10 = field(F32);
  f_0x14 = field(F32);
}
