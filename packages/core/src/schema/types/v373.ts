import { Class, field } from "../core";

import { F32, U32 } from "./atomic";
import { V333 } from "./v333";
import { V380 } from "./v380";

export class V373 extends Class {
  __id = 373;
  __offset = 0x20bb0;

  base = field(V380);
  f_0x58 = field(U32);
  f_0x5c = field(V333);
  f_0x70 = field(F32);
  f_0x74 = field(F32);
}
