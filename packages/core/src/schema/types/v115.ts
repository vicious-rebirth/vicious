import { ClassCodec, deprecated, field } from "../core";

import { Action } from "./action";
import { AssetFromType, AssetFromTypeSizedList, AssetReference } from "./asset";

export class V115 extends ClassCodec {
  __id = 115;

  base = field(Action);
  f_0x08 = field(AssetReference);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  f_0x0c = field(AssetFromTypeSizedList, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x14 = field(AssetFromType, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
}
