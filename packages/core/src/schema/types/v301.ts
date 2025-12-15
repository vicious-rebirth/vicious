import { ClassCodec, field } from "../core";

import { AssetReference } from "./asset";
import { U32, U8 } from "./atomic";
import { FN_0x21c40, FN_0x22080 } from "./fns";
import { V300 } from "./v300";
import { V421 } from "./v421";

export class V301 extends ClassCodec {
  __id = 301;

  base = field(V300);
  f_1 = field(U8, { condition: (ctx) => ctx.lt((ctx) => ctx.version(), 2) });
  f_2 = field(U8, { condition: (ctx) => ctx.lt((ctx) => ctx.version(), 2) });
  f_3 = field(U8, { condition: (ctx) => ctx.lt((ctx) => ctx.version(), 2) });
  f_4 = field(AssetReference, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 2),
  });
  f_5 = field(FN_0x22080, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_6 = field(FN_0x21c40, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  v421 = field(V421, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 3),
  });
  old = field(AssetReference, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 3),
  });
  old2 = field(U32, { condition: (ctx) => ctx.lt((ctx) => ctx.version(), 3) });
}
