import { ClassCodec, field } from "../core";

import { Action } from "./action";
import { U32 } from "./atomic";
import { FN_0x22520 } from "./fns";

export class V506 extends ClassCodec {
  __id = 506;

  base = field(Action);
  f_1 = field(FN_0x22520);
  f_0x14 = field(U32);
  f_0x18 = field(U32);
}
