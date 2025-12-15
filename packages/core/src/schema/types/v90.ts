import { ClassCodec, field } from "../core";

import { V23 } from "./v23";

export class V90 extends ClassCodec {
  __id = 90;
  __todo = true;

  base = field(V23);
}
