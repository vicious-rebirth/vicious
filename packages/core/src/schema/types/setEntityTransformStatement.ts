import { Class, deprecated, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { BOOL, U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { Label } from "./label";
import { PointSelector } from "./pointSelector";
import { Statement } from "./statement";

export class SetEntityTransformStatement extends Class {
  __id = 220;
  __offset = 0x422c0;

  base = field(Statement);
  f_0x08 = field(EntitySelector);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  f_0x34 = field(PointSelector, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x48 = field(EntitySelector, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x74 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x78 = field(U32, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x7c = field(U32, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x80 = field(Label, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x98 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0xa0 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}
