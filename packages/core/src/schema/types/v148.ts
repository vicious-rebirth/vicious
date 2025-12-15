import { Class, deprecated, field } from "../core";

import { FN_0x22520 } from "./fns";
import { V109 } from "./v109";

export class V148 extends Class {
  __id = 148;

  base = field(V109);
  f_1 = field(FN_0x22520, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  _ = deprecated((ctx) => ctx.lte((ctx) => ctx.version(), 1));
}
