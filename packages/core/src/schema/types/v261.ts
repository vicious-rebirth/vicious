import { ClassCodec, field } from "../core";

import { Base } from "./base";

export class V261 extends ClassCodec {
  __id = 261;
  __todo = true;

  base = field(Base);
}
