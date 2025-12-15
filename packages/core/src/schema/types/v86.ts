import { ClassCodec, field } from "../core";

import { V23 } from "./v23";

export class V86 extends ClassCodec {
  __id = 86;
  __todo = true;

  base = field(V23);
}
