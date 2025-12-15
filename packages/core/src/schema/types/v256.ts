import { Class, field } from "../core";

import { U32 } from "./atomic";
import { V186 } from "./v186";

export class V256 extends Class {
  __id = 256;
  __offset = 0x6dfa0;

  base = field(V186);
  f_0x38 = field(U32);
}
