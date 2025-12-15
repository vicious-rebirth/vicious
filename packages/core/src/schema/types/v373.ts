import { ClassCodec, field } from "../core";

import { F32, U32 } from "./atomic";
import { V333 } from "./v333";
import { V380 } from "./v380";

export class V373 extends ClassCodec {
  __id = 373;

  base = field(V380);
  f_0x58 = field(U32);
  f_0x5c = field(V333);
  f_0x70 = field(F32);
  f_0x74 = field(F32);
}
