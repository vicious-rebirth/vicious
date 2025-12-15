import { Class, Codec, deprecated, field } from "../core";

import { AssetFromType, AssetReferenceSizedList } from "./asset";
import { F32, U32, U16, U8 } from "./atomic";
import { V132 } from "./v132";

export class V133 extends Class {
  __id = 133;

  base = field(V132);
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 0));
  f_0x78 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_1 = field(U32);
  f_2 = field(U32);
  f_3 = field((ctx) => ctx.list(V133_1), {
    custom: (ctx) => {
      // TODO: Confirm size
      const size = ctx.var(U32, (ctx) => ctx.mul(this.f_1, this.f_2));
      ctx.allocate(this.f_3, size);

      ctx.for(size, (ctx) =>
        ctx.walk((ctx) => ctx.index(this.f_3, (ctx) => ctx.iterator()))
      );
    },
  });
  f_0x70 = field(U8, { condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3) });
  f_0x8c = field(AssetReferenceSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  __ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 5));
  f_0x7c = field(U16, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 5),
  });
  f_0x7e = field(U16, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 5),
  });
  f_0x90 = field(F32, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 5),
  });
  f_0x94 = field(F32, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 5),
  });
}

export class V133_1 extends Codec {
  f_1 = field(AssetFromType);
  list = field((ctx) => ctx.list(AssetFromType), {
    condition: (ctx) => ctx.gt(this.f_1.type, 0),
    custom: (ctx) => {
      ctx.loop((ctx) => {
        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));

        ctx.if(
          (ctx) =>
            ctx.lte(
              (ctx) => ctx.index(this.list, (ctx) => ctx.iterator()).type,
              0
            ),
          (ctx) => ctx.break()
        );
      });
    },
  });
}
