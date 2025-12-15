import { Class, field } from "../core";

import { Action } from "./action";
import { AssetFromType, AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { FN_0x22520 } from "./fns";

export class V372 extends Class {
  __id = 372;
  __offset = 0x4a630;

  base = field(Action);
  f_1 = field(FN_0x22520);
  f_0x14 = field(U32);
  f_0x18 = field(AssetFromType);
  f_0x1c = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
