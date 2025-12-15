import { Class, field } from "../core";

import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { V108 } from "./v108";
import { V369 } from "./v369";

export class V481 extends Class {
  __id = 481;

  // TODO: Handle conditional parent
  base = null;
  oldBase = field(V369, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 2),
  });
  newBase = field(V108, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_1 = field(AssetFromTypeWrap);
  f_2 = field(U32);
}
