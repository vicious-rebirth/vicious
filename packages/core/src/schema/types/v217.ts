import { Class, deprecated, field } from "../core";

import { AssetFromType, AssetFromTypeWrap, AssetReference } from "./asset";
import { U32 } from "./atomic";
import { Base } from "./base";

export class V217 extends Class {
  __id = 217;

  base = field(Base);
  f_0x04 = field(AssetReference);
  f_0x08 = field(U32);
  f_0x0c = field(U32);
  f_0x10 = field(AssetReference);
  f_0x14 = field(U32);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 5));
  f_0x18 = field(AssetFromType, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 5),
  });
  f_0x1c = field(AssetReference);
  f_0x20 = field(U32);
  f_0x24 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  __ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 3));
}
