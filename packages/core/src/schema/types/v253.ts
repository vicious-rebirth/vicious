import { Class, deprecated, field } from "../core";

import { Action } from "./action";
import { AssetFromType, AssetFromTypeWrap, AssetReference } from "./asset";
import { U32 } from "./atomic";
import { FN_0x22520 } from "./fns";

export class V253 extends Class {
  __id = 253;
  __offset = 0x1aca0;

  base = field(Action);
  f_0x08 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0x0c = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 5),
  });
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  f_0x10 = field(FN_0x22520, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x1c = field(AssetReference);
  f_0x20 = field(U32);
  f_0x24 = field(AssetFromType, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x2c = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0x28 = field(AssetFromType, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  f_0x30 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 5),
  });
}
