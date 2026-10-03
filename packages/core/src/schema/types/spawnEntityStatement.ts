import { Class, deprecated, field } from "../core";
import { AssetFromTypeWrap, AssetReference } from "./asset";
import { BOOL, U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { EntityTemplateSelector } from "./entityTemplateSelector";
import { Label } from "./label";
import { PointSelector } from "./pointSelector";
import { Statement } from "./statement";

export class SpawnEntityStatement extends Class {
  __id = 224;
  __offset = 0x45c30;

  base = field(Statement);
  f_0x16_1 = field(EntityTemplateSelector, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 8),
  });
  f_0x16_2 = field(AssetReference, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 8),
  });
  f_0x20 = field(U32);
  f_0x34 = field(AssetReference, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 6),
  });
  f_0x24 = field(PointSelector, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 6),
  });
  f_0x38 = field(EntitySelector);
  f_0x68 = field(Label);
  f_0xd4 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 10),
  });
  f_0x80 = field(AssetFromTypeWrap);
  f_0x84 = field(EntitySelector);
  f_0xb0 = field(Label);
  f_0xc8 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 9),
  });
  f_0xcc = field(AssetFromTypeWrap);
  f_0xd0 = field(AssetFromTypeWrap);
  f_0xd8 = field(BOOL);
  f_0xd9 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0xda = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0xe0 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0xe4 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0xe8 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0xec = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0xf0 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0xf4 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  f_0xf8 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  f_0xfc = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 7));
  f_0x100 = field(U32, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 7),
  });
  f_0x104 = field(PointSelector, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 7),
  });
  f_0xdb = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 8),
  });
  f_0xdc = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 8),
  });
  f_0x118 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 11),
  });
  f_0x11c = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 12),
  });
  f_0x120 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 12),
  });
  f_0x124 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 13),
  });
  f_0x128 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 14),
  });
}
