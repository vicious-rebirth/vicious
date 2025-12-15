import { Class, field } from "../core";

import { I32, U32 } from "./atomic";
import { V18 } from "./v18";

export class V19 extends Class {
  __id = 19;
  __offset = 0x111de0;

  base = field(V18);
  f_0x60 = field(I32);
  f_0x64 = field(U32);
}
