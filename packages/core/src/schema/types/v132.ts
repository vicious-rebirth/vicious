import { Class, deprecated, field } from "../core";

import { AssetFromTypeSizedList, AssetReferenceSuffixList } from "./asset";
import { U32, U16 } from "./atomic";
import { Named } from "./named";

export class V132 extends Class {
  __id = 132;

  base = field(Named);
  f_0x20 = field(U32);
  f_0x24 = field(U32);
  f_0x28 = field(AssetReferenceSuffixList, {
    custom: (ctx) => {
      ctx.set(this.f_0x28.count, 4);
      ctx.walk();
    },
  });
  f_0x48 = field(U32);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 4));
  f_0x4c = field(U16, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 4),
  });
  f_0x4e = field(U16, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 4),
  });
  f_0x50 = field(U16, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 4),
  });
  f_0x52 = field(U16, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 4),
  });
  f_0x54 = field(U16, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 4),
  });
  f_0x56 = field(U16, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 4),
  });
  __ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 3));
  f_0x60 = field(AssetFromTypeSizedList, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 3),
  });
}
