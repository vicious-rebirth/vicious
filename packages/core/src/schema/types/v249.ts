import { Class, deprecated, field } from "../core";

import { Action } from "./action";
import { AssetFromTypeWrap, AssetReference } from "./asset";
import { U32 } from "./atomic";
import { V508 } from "./v508";

export class V249 extends Class {
  __id = 249;
  __offset = 0x23830;

  base = field(Action);
  f_0x08 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 5),
  });
  f_1 = field(V508, { condition: (ctx) => ctx.gte((ctx) => ctx.version(), 8) });
  f_2 = field(AssetReference, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 8),
  });
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 5));
  __ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 7));
  f_0x24 = field(AssetFromTypeWrap);
  ___ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 5));
  f_0x0c = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 5),
  });
  ____ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 4));
}
