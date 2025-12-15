import { ClassCodec, field } from "../core";

import { V22 } from "./v22";

export class V402 extends ClassCodec {
  __id = 402;
  __todo = true;

  base = field(V22);
}
