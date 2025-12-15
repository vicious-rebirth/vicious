import { ClassCodec, field } from "../core";

import { Base } from "./base";

export class V93 extends ClassCodec {
  __id = 93;
  __todo = true;

  base = field(Base);
}
