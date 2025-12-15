import { ClassCodec, field } from "../core";

import { Action } from "./action";

export class V450 extends ClassCodec {
  __id = 450;
  __todo = true;

  base = field(Action);
}
