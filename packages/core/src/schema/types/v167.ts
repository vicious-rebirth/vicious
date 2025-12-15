import { Class, field } from "../core";

import { Action } from "./action";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { V301 } from "./v301";

export class V167 extends Class {
  __id = 167;

  base = field(Action);
  old = field(U32, { condition: (ctx) => ctx.lt((ctx) => ctx.version(), 2) });
  f_0x00 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  v301 = field(V301);
}
