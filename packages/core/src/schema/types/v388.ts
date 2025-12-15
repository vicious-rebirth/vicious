import { Class, field } from "../core";

import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { V108 } from "./v108";
import { V369 } from "./v369";

export class V388 extends Class {
  __id = 388;

  // TODO: Handle conditional parent?
  base = null;
  oldBase = field(V369, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 3),
  });
  newBase = field(V108, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 3),
  });
  f_1 = field(U32);
  f_2 = field(AssetFromTypeWrap);
  f_0x0c = field(U32);
}
