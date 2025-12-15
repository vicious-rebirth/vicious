import { ClassCodec, field } from "../core";

import { V160 } from "./v160";

export class V505 extends ClassCodec {
  __id = 505;

  base = field(V160);
}
