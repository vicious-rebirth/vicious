import { Class, deprecated, field } from "../core";

import { Action } from "./action";
import { AssetFromType } from "./asset";

export class V384 extends Class {
  __id = 384;

  base = field(Action);
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 0));
  f_1 = field(AssetFromType);
  f_0x0c = field(AssetFromType);
}
