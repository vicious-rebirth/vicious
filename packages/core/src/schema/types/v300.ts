import { ClassCodec, field } from "../core";

import { Base } from "./base";

export class V300 extends ClassCodec {
  __id = 300;

  base = field(Base);
}
