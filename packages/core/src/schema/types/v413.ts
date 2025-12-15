import { Class, deprecated, field } from "../core";

import { Action } from "./action";
import { AssetFromType, AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { Label } from "./label";

export class V413 extends Class {
  __id = 413;

  base = field(Action);
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 0));
  f_1 = field(AssetFromType);
  f_0x0c = field(AssetFromType);
  f_0x10 = field(AssetFromTypeWrap);
  f_0x14 = field(AssetFromTypeWrap);
  f_0x18 = field(Label);
  f_0x30 = field(Label);
  f_0x48 = field(U32);
}
