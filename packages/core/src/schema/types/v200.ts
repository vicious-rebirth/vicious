import { ClassCodec, field } from "../core";

import { U32 } from "./atomic";
import { Named } from "./named";
import { Script } from "./script";

export class V200 extends ClassCodec {
  __id = 200;

  base = field(Named);
  f_0x38 = field(U32);
  f_0x1c = field(Script);
}
