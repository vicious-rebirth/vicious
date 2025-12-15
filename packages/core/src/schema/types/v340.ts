import { ClassCodec, field } from "../core";

import { Action } from "./action";
import { V421 } from "./v421";

export class V340 extends ClassCodec {
  __id = 340;

  base = field(Action);
  f_0x08 = field(V421);
}
