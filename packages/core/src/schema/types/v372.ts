import { ClassCodec, field } from "../core";

import { Action } from "./action";
import { AssetFromType, AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { FN_0x22520 } from "./fns";

export class V372 extends ClassCodec {
  __id = 372;

  base = field(Action);
  f_1 = field(FN_0x22520);
  f_0x14 = field(U32);
  f_0x18 = field(AssetFromType);
  f_0x1c = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
