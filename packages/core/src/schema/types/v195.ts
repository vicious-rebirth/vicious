import { ClassCodec, field } from "../core";

import { Action } from "./action";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { V301 } from "./v301";

export class V195 extends ClassCodec {
  __id = 195;

  base = field(Action);
  f_0x08 = field(V301);
  f_0x34 = field(U32);
  f_0x3c = field(U32);
  f_0x40 = field(AssetFromTypeWrap);
  f_0x38 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}
