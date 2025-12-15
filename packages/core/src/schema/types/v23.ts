import { ClassCodec, field } from "../core";

import { V22 } from "./v22";

export class V23 extends ClassCodec {
  __id = 23;

  base = field(V22);
}
