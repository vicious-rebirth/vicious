import { ClassCodec, field } from "../core";

import { Action } from "./action";

export class V113 extends ClassCodec {
  __id = 113;
  __todo = true;

  base = field(Action);
}
