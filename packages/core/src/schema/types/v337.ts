import { ClassCodec, deprecated, field } from "../core";

import { Action } from "./action";
import { FN_0x22520 } from "./fns";

export class V337 extends ClassCodec {
  __id = 337;

  base = field(Action);
  _ = deprecated((ctx) => ctx.lte((ctx) => ctx.version(), 1));
  f_1 = field(FN_0x22520, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
