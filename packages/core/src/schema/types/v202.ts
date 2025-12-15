import { Class, field } from "../core";

import { U32 } from "./atomic";
import { V109 } from "./v109";

export class V202 extends Class {
  __id = 202;

  base = field(V109);
  f_1 = field(U32);
}
