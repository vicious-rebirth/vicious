import { Class, field } from "../core";

import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { FN_0x22520 } from "./fns";
import { V108 } from "./v108";

export class V497 extends Class {
  __id = 497;
  __offset = 0x5d770;

  base = field(V108);
  f_1 = field(FN_0x22520);
  f_0x10 = field(U32);
  f_0x14 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
