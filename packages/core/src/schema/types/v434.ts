import { ClassCodec, field } from "../core";

import { Action } from "./action";
import { U32, BOOL } from "./atomic";
import { V166 } from "./v166";

export class V434 extends ClassCodec {
  __id = 434;

  base = field(Action);
  f_1 = field(V166);
  f_0x40 = field(BOOL);
  f_0x44 = field(U32);
}
