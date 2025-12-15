import { ClassCodec, field } from "../core";

import { Base } from "./base";

export class V410 extends ClassCodec {
  __id = 410;
  __todo = true;

  base = field(Base);
}
