import { Class, deprecated, field } from "../core";

import { Action } from "./action";
import { AssetFromTypeWrap } from "./asset";

export class V168 extends Class {
  __id = 168;
  __offset = 0x23c70;

  base = field(Action);
  _ = deprecated((ctx) => ctx.lte((ctx) => ctx.version(), 2));
  f_1 = field(AssetFromTypeWrap);
  __ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 4));
  f_0x0c = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 4),
  });
}
