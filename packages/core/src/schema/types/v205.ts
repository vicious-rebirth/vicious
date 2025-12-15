import { Class, deprecated, field } from "../core";

import { Action } from "./action";
import { AssetFromTypeWrap } from "./asset";
import { U32, BOOL } from "./atomic";
import { V301 } from "./v301";

export class V205 extends Class {
  __id = 205;

  base = field(Action);
  v301 = field(V301);
  f_0x34 = field(AssetFromTypeWrap);
  f_0x38 = field(U32);
  f_0x3c = field(BOOL);
  f_0x40 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  _ = deprecated((ctx) => ctx.lte((ctx) => ctx.version(), 1));
}
