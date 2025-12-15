import { Class, field } from "../core";

import { AssetReferenceSuffix } from "./asset";
import { U32, BOOL } from "./atomic";
import { FN_0x22520 } from "./fns";
import { V109 } from "./v109";

export class V150 extends Class {
  __id = 150;
  __offset = 0x5daf0;

  base = field(V109);
  f_1 = field(AssetReferenceSuffix, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 2),
  });
  f_2 = field(FN_0x22520, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x10 = field(U32);
  f_0x14 = field(U32);
  f_0x18 = field(BOOL);
  f_0x1c = field(U32);
}
