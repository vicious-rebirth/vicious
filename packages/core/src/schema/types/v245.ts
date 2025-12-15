import { ClassCodec, field } from "../core";

import { Action } from "./action";

export class V245 extends ClassCodec {
  __id = 245;

  base = field(Action);
}
