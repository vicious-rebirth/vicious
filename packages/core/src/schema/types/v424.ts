import { Class, deprecated, field } from "../core";

import { Action } from "./action";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";

export class V424 extends Class {
  __id = 424;
  __offset = 0x23690;

  base = field(Action);
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 0));
  f_1 = field(U32);
  f_0x0c = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
