import { ClassCodec, field } from "../core";

import { Action } from "./action";
import { BOOL } from "./atomic";
import { V302 } from "./v302";

export class V251 extends ClassCodec {
  __id = 251;

  base = field(Action);
  f_0x08 = field(V302);
  f_0x1c = field(BOOL);
}
