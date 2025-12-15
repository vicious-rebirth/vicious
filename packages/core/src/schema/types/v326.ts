import { Class, field } from "../core";

import { Action } from "./action";
import { U32 } from "./atomic";
import { V166 } from "./v166";

export class V326 extends Class {
  __id = 326;
  __offset = 0x3ee80;

  base = field(Action);
  f_1 = field(U32);
  f_0x0c = field(U32);
  v166 = field(V166);
}
