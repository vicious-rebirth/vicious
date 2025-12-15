import { Class, deprecated, field } from "../core";

import { FN_0x22520 } from "./fns";
import { V109 } from "./v109";

export class V147 extends Class {
  __id = 147;
  __offset = 0x5d640;

  base = field(V109);
  f_1 = field(FN_0x22520, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  _ = deprecated((ctx) => ctx.lte((ctx) => ctx.version(), 1));
}
