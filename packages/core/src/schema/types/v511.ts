import { Class, deprecated, field } from "../core";

import { FN_0x224c0, FN_0x22080 } from "./fns";
import { V300 } from "./v300";

export class V511 extends Class {
  __id = 511;

  base = field(V300);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  f_1 = field(FN_0x22080);
  f_2 = field(FN_0x224c0);
}
