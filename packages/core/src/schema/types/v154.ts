import { Class, deprecated, field } from "../core";

import { AssetFromTypeSizedList, AssetReferenceList } from "./asset";
import { F32, U32 } from "./atomic";
import { Base } from "./base";
import { Vector3 } from "./math";

export class V154 extends Class {
  __id = 154;
  __offset = 0x26c20;

  base = field(Base);
  f_0x00 = field(AssetFromTypeSizedList);
  f_0x0c = field(AssetReferenceList, {
    custom: (ctx) => {
      ctx.set(this.f_0x0c.consume, false);

      ctx.if(
        (ctx) => ctx.gte((ctx) => ctx.version(), 2),
        (ctx) => {
          ctx.set(this.f_0x0c.count, 2);
        },
        (ctx) => {
          ctx.set(this.f_0x0c.count, 1);
        }
      );

      ctx.walk();
    },
  });
  f_0x18 = field(AssetFromTypeSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 4));
  f_0x20 = field(Vector3, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 4),
  });
  f_0x2c = field(F32, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 4),
  });
  f_0x30 = field(F32, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 4),
  });
  old = field(U32, { condition: (ctx) => ctx.lt((ctx) => ctx.version(), 5) });
  f_0x34 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 5),
  });
}
