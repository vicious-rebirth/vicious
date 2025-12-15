import { ClassCodec, field } from "../core";

import { Action } from "./action";
import { AssetReferenceSuffix } from "./asset";
import { U32 } from "./atomic";
import { FN_0x22520 } from "./fns";

export class V516 extends ClassCodec {
  __id = 516;

  base = field(Action);
  f_1 = field(AssetReferenceSuffix, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 2),
  });
  f_2 = field(FN_0x22520, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x14 = field(U32);
}
