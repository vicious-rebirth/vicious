import { Class, Struct, deprecated, field } from "../core";
import { AssetFromType, AssetReferenceSizedList } from "./asset";
import { F32, U8, U16, U32 } from "./atomic";
import { UIElement } from "./uiElement";

export class UIGrid extends Class {
  __id = 133;
  __offset = 0x99700;

  base = field(UIElement);
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 0));
  gridFlags = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_1 = field(U32);
  f_2 = field(U32);
  cells = field((ctx) => ctx.list(UIGridCell), {
    custom: (ctx) => {
      // TODO: Confirm size
      const size = ctx.var(U32, (ctx) => ctx.mul(this.f_1, this.f_2));
      ctx.allocate(this.cells, size);

      ctx.for(size, (ctx) =>
        ctx.walk((ctx) => ctx.index(this.cells, (ctx) => ctx.iterator()))
      );
    },
  });
  opacity = field(U8, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
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

export class UIGridCell extends Struct {
  __offset = 0x9980f;

  firstElement = field(AssetFromType);
  list = field((ctx) => ctx.list(AssetFromType, 64), {
    condition: (ctx) => ctx.gt(this.firstElement.type, 0),
    custom: (ctx) => {
      ctx.allocate(this.list);

      ctx.loop((ctx) => {
        ctx.grow(this.list, (ctx) => ctx.iterator());

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
