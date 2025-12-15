import { ClassCodec, field } from "../core";

import { U32 } from "./atomic";
import { V391 } from "./v391";

export class V515 extends ClassCodec {
  __id = 515;

  base = field(V391);
  f_1 = field(U32);
}
