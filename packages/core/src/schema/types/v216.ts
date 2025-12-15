import { ClassCodec, field } from "../core";

import { U32 } from "./atomic";
import { V109 } from "./v109";
import { V301 } from "./v301";

export class V216 extends ClassCodec {
  __id = 216;

  base = field(V109);
  f_1 = field(V301);
  f_2 = field(U32);
}
