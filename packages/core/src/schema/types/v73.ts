import { Class, Struct, deprecated, field } from "../core";

import { AssetFromType, AssetReference } from "./asset";
import { U32 } from "./atomic";
import { V19 } from "./v19";
import { V71 } from "./v71";

export class V73 extends Class {
  __id = 73;

  base = field(V19);
  f_0x44 = field(AssetReference);
  f_0x48 = field(AssetReference);
  f_0x74 = field(V71);
  f_0xe8 = field(V71);
  f_0x6c = field(U32);
  f_0x70 = field(U32);
  f_0x15c = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_1 = field(V73_1);
}

export class V73_1 extends Struct {
  __metadata = true;

  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 0));
  f_0x160 = field(AssetFromType, {
    condition: (ctx) => ctx.neq((ctx) => ctx.version(), 0),
  });
}
