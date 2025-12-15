import { ClassCodec, deprecated, field } from "../core";

import { AssetReferenceSizedList } from "./asset";
import { U8 } from "./atomic";
import { Material } from "./material";

export class V18 extends ClassCodec {
  __id = 18;

  base = field(Material);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  f_0x16 = field(U8, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x14 = field(U8, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x15 = field(U8, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x18 = field(AssetReferenceSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  __ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 4));
}
