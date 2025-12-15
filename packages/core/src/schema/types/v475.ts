import { ClassCodec, field } from "../core";

import { Action } from "./action";

export class V475 extends ClassCodec {
  __id = 475;
  __todo = true;

  base = field(Action);
}
