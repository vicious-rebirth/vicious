import { Class, field } from "../core";

import { U32 } from "./atomic";
import { V368 } from "./v368";

export class V460 extends Class {
  __id = 460;

  base = field(V368);
  f_1 = field(U32);
}
