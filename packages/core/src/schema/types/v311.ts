import { ClassCodec, field } from "../core";

import { U32 } from "./atomic";
import { V108 } from "./v108";
import { V301 } from "./v301";

export class V311 extends ClassCodec {
  __id = 311;

  base = field(V108);
  f_1 = field(V301);
  f_2 = field(U32);
}
