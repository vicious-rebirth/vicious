import { ClassCodec, field } from "../core";

import { Base } from "./base";

export class V254 extends ClassCodec {
  __id = 254;
  __todo = true;

  base = field(Base);
}
