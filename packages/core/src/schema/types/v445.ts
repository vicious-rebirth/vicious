import { ClassCodec, field } from "../core";

import { Action } from "./action";

export class V445 extends ClassCodec {
  __id = 445;
  __todo = true;

  base = field(Action);
}
