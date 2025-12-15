import { ClassCodec, field } from "../core";

import { V160 } from "./v160";

export class V225 extends ClassCodec {
  __id = 225;

  base = field(V160);
}
