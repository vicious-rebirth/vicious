import { ClassCodec, field } from "../core";

import { Action } from "./action";
import { U32 } from "./atomic";
import { V166 } from "./v166";

export class V334 extends ClassCodec {
  __id = 334;

  base = field(Action);
  f_1 = field(U32);
  f_0xc = field(V166);
}
