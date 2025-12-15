import { ClassCodec, field } from "../core";

import { V160 } from "./v160";

export class V490 extends ClassCodec {
  __id = 490;

  base = field(V160);
}
