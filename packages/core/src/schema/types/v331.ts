import { Class, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { U8, U32 } from "./atomic";
import { Statement } from "./statement";

export class V331 extends Class {
  __id = 331;
  __offset = 0x23b90;

  base = field(Statement);
  old = field(U8, {
    condition: (ctx) => ctx.eq((ctx) => ctx.version(), 2),
    custom: (ctx) => {
      ctx.walk();
      ctx.set(this.f_1, 2);
    },
  });
  f_1 = field(U32, { condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2) });
  f_0x10 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0x0c = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
}
