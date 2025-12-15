import { ClassCodec, field } from "../core";

import { Action } from "./action";

export class V332 extends ClassCodec {
  __id = 332;
  __todo = true;

  base = field(Action);
}
