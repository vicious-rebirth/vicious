import { ClassCodec, field } from "../core";

import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { FN_0x22520 } from "./fns";
import { V108 } from "./v108";

export class V497 extends ClassCodec {
  __id = 497;

  base = field(V108);
  f_1 = field(FN_0x22520);
  f_0x10 = field(U32);
  f_0x14 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
