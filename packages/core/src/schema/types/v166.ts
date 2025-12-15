import { Class, field } from "../core";

import { U32 } from "./atomic";
import { Base } from "./base";
import { V301 } from "./v301";

export class V166 extends Class {
  __id = 166;
  __offset = 0x21bb0;

  base = field(Base);
  f_1 = field(U32);
  f_2 = field(V301);
}
