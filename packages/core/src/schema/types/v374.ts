import { ClassCodec, field } from "../core";

import { F32, U32 } from "./atomic";
import { FN_0x5e2d0 } from "./fns";
import { Label } from "./label";
import { V333 } from "./v333";
import { V380 } from "./v380";

export class V374 extends ClassCodec {
  __id = 374;

  base = field(V380);
  f_0x58 = field(U32);
  f_0x5c = field(V333);
  f_1 = field(FN_0x5e2d0);
  f_0x74 = field(F32);
  f_0x78 = field(F32);
  f_0x7c = field(Label, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
