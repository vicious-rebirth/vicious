import { Class, Struct, deprecated, field } from "../core";

import { AssetFromType, AssetReference } from "./asset";
import { U32 } from "./atomic";
import { V19 } from "./v19";

export class V27 extends Class {
  __id = 27;

  base = field(V19);
  texture = field(AssetReference);
  f_0x6c = field(U32);
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 1));
  f_0x70 = field(AssetFromType, {
    condition: (ctx) => ctx.neq((ctx) => ctx.version(), 1),
  });
  __ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 4));
  f_1 = field(V27_1);
}

export class V27_1 extends Struct {
  __metadata = true;

  data = field(AssetFromType);
}
