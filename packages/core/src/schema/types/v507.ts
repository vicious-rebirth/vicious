import { ClassCodec, field } from "../core";

import { Action } from "./action";

export class V507 extends ClassCodec {
  __id = 507;
  __todo = true;

  base = field(Action);
}
