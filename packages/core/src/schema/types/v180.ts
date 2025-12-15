import { ClassCodec, field } from "../core";

import { Action } from "./action";

export class V180 extends ClassCodec {
  __id = 180;
  __todo = true;

  base = field(Action);
}
