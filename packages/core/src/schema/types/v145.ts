import { ClassCodec, deprecated, field } from "../core";

import { U32, U8 } from "./atomic";
import { FN_0x22520 } from "./fns";
import { V109 } from "./v109";

export class V145 extends ClassCodec {
  __id = 145;

  base = field(V109);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  f_1 = field(FN_0x22520);
  f_0x10 = field(U32);
  f_0x14 = field(U8);
  f_0x18 = field(U32);
}
