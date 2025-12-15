import { ClassCodec, deprecated, field } from "../core";

import { U32 } from "./atomic";
import { FN_0x22520 } from "./fns";
import { V109 } from "./v109";

export class V152 extends ClassCodec {
  __id = 152;

  base = field(V109);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  f_1 = field(FN_0x22520, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_2 = field(U32);
}
