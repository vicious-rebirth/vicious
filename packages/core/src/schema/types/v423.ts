import { Class, field } from "../core";

import { Action } from "./action";
import { AssetFromTypeWrap } from "./asset";
import { U8, U32 } from "./atomic";

export class V423 extends Class {
  __id = 423;
  __offset = 0x24210;

  base = field(Action);
  f_1 = field(U32);
  f_2 = field(AssetFromTypeWrap);
  f_3 = field(U8, { condition: (ctx) => ctx.eq((ctx) => ctx.version(), 2) });
  f_0x0c = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0x14 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
}
