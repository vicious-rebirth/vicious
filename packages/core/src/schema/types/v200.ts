import { Class, field } from "../core";

import { U32 } from "./atomic";
import { Named } from "./named";
import { Script } from "./script";

export class V200 extends Class {
  __id = 200;
  __offset = 0x2e7a0;

  base = field(Named);
  f_0x38 = field(U32);
  f_0x1c = field(Script);
}
