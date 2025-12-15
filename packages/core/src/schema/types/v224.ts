import { ClassCodec, deprecated, field } from "../core";

import { Action } from "./action";
import { AssetFromTypeWrap, AssetReference } from "./asset";
import { U32, BOOL } from "./atomic";
import { Label } from "./label";
import { V301 } from "./v301";
import { V333 } from "./v333";
import { V422 } from "./v422";

export class V224 extends ClassCodec {
  __id = 224;

  base = field(Action);
  f_0x16_1 = field(V422, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 8),
  });
  f_0x16_2 = field(AssetReference, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 8),
  });
  f_0x20 = field(U32);
  f_0x34 = field(AssetReference, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 6),
  });
  f_0x24 = field(V333, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 6),
  });
  f_0x38 = field(V301);
  f_0x68 = field(Label);
  f_0xd4 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 10),
  });
  f_0x80 = field(AssetFromTypeWrap);
  f_0x84 = field(V301);
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
  f_0x104 = field(V333, {
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
