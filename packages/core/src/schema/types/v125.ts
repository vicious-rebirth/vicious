import { ClassCodec, deprecated, field } from "../core";

import { Action } from "./action";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { Script } from "./script";
import { V301 } from "./v301";
import { V319 } from "./v319";

export class V125 extends ClassCodec {
  __id = 125;

  base = field(Action);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  f_0x04 = field(U32);
  f_0x0c = field(V301);
  __ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  f_0x38 = field(V319, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x4c = field(AssetFromTypeWrap);
  f_0x50 = field(AssetFromTypeWrap);
  onCompleted = field(Script);
}
