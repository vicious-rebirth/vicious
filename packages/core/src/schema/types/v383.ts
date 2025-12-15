import { Class, field } from "../core";

import { F32, U32 } from "./atomic";
import { FN_0x5e2d0 } from "./fns";
import { Label } from "./label";
import { V380 } from "./v380";

export class V383 extends Class {
  __id = 383;

  base = field(V380);
  f_0x58 = field(U32);
  f_0x5c = field(FN_0x5e2d0);
  f_0x60 = field(F32);
  f_0x64 = field(F32);
  f_0x68 = field(Label);
}
