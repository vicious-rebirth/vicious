import { ClassCodec, deprecated, field } from "../core";

import { Action } from "./action";
import { AssetFromType, AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";

export class V385 extends ClassCodec {
  __id = 385;

  base = field(Action);
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 4));
  f_0x08 = field(U32);
  f_0x0c = field(AssetFromTypeWrap);
  f_0x10 = field(AssetFromTypeWrap);
  f_0x14 = field(AssetFromType);
}
