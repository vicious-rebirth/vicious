import { ClassCodec, field } from "../core";

import { Action } from "./action";
import { U32 } from "./atomic";

export class V479 extends ClassCodec {
  __id = 479;

  base = field(Action);
  f_1 = field(U32);
}
