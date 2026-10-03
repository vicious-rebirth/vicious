import { Class, deprecated, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { BOOL, U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { Label } from "./label";
import { PointSelector } from "./pointSelector";
import { ValueExpression } from "./valueExpression";

export class EntityAimAngleExpression extends Class {
  __id = 240;
  __offset = 0x58190;

  base = field(ValueExpression);
  f_0x04 = field(U32);
  f_0x08 = field(EntitySelector);
  f_0x34 = field(EntitySelector);
  f_0x74 = field(Label, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x8c = field(Label, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0xa4 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 5),
  });
  f_0xac = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0xb4 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0xb8 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 4));
  f_0xa8 = field(U32, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 4),
  });
  f_0x60 = field(PointSelector, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 4),
  });
  f_0xc4 = field(U32, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 4),
  });
  f_0xbc = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  f_0xc5 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 6),
  });
  f_0xc6 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 6),
  });
  f_0xb0 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 7),
  });
  f_0xc0 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 7),
  });
}
