import { ClassCodec, field } from "../core";

import { Base } from "./base";

export class V22 extends ClassCodec {
  __id = 22;

  base = field(Base);
}
