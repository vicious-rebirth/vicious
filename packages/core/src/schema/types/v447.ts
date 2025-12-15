import { ClassCodec, field } from "../core";

import { Action } from "./action";

export class V447 extends ClassCodec {
  __id = 447;
  __todo = true;

  base = field(Action);
}
