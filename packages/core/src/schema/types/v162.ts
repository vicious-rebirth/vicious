import { Class, field } from "../core";

import { F32, U32 } from "./atomic";
import { Base } from "./base";

export class V162 extends Class {
  __id = 162;
  __offset = 0x27600;

  base = field(Base);
  f_1 = field(U32);
  f_2 = field(U32);
  f_0xc = field(F32);
  f_0x10 = field(F32);
  f_0x14 = field(F32);
}
