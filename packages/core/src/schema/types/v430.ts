import { ClassCodec, field } from "../core";

import { U32 } from "./atomic";
import { V428 } from "./v428";

export class V430 extends ClassCodec {
  __id = 430;

  base = field(V428);
  f_0x38 = field(U32);
}
