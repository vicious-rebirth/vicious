import { ClassCodec, field } from "../core";

import { Action } from "./action";

export class V408 extends ClassCodec {
  __id = 408;
  __todo = true;

  base = field(Action);
}
