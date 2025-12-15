import { ClassCodec, field } from "../core";

import { U32 } from "./atomic";
import { V18 } from "./v18";

export class V50 extends ClassCodec {
  __id = 50;

  base = field(V18);
  tint = field(U32);
}
