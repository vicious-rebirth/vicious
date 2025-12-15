import { ClassCodec, field } from "../core";

import { Action } from "./action";

export class V476 extends ClassCodec {
  __id = 476;
  __todo = true;

  base = field(Action);
}
