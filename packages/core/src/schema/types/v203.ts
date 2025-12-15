import { Class, field } from "../core";

import { U32 } from "./atomic";
import { V109 } from "./v109";
import { V301 } from "./v301";

export class V203 extends Class {
  __id = 203;

  base = field(V109);
  f_0x04 = field(V301);
  f_0x30 = field(U32);
}
