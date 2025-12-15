import { ClassCodec, field } from "../core";

import { U32 } from "./atomic";
import { Base } from "./base";
import { V301 } from "./v301";

export class V166 extends ClassCodec {
  __id = 166;

  base = field(Base);
  f_1 = field(U32);
  f_2 = field(V301);
}
