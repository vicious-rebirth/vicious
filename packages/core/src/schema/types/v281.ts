import { Class, deprecated, field } from "../core";
import { Action } from "./action";
import {
  AssetFromType,
  AssetFromTypeWrap,
  AssetReferenceSuffix,
} from "./asset";
import { BOOL, U32 } from "./atomic";
import { FN_0x5e2d0 } from "./fns";
import { Label } from "./label";
import { Script } from "./script";
import { V166 } from "./v166";
import { V301 } from "./v301";

export class V281 extends Class {
  __id = 281;
  __offset = 0x644b0;

  base = field(Action);
  f_0x54 = field(V301);
  f_0x08 = field(Label);
  f_0x80 = field(V166);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  f_0xbc = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  onCollide = field(Script);
  f_0xb8 = field(U32);
  f_0xc0 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0xc4 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  __ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 4));
  f_0xc8 = field(AssetFromType, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.gt((ctx) => ctx.version(), 3),
        (ctx) => ctx.neq((ctx) => ctx.version(), 4)
      ),
  });
  f_0x20 = field(Label, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0xcc = field(AssetFromType, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  old = field(V301, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.gt((ctx) => ctx.version(), 5),
        (ctx) => ctx.lt((ctx) => ctx.version(), 16)
      ),
  });
  f_0xd0 = field(FN_0x5e2d0, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 16),
  });
  ___ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 7));
  f_0xd4 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 7),
  });
  f_0xd8 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 7),
  });
  f_0xdc = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 7),
  });
  f_0xe0 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 7),
  });
  f_0xe4 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 7),
  });
  f_0xe8 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 7),
  });
  old2 = field(U32, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.gt((ctx) => ctx.version(), 8),
        (ctx) => ctx.lt((ctx) => ctx.version(), 15)
      ),
  });
  f_0xec = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 9),
  });
  f_0xf0 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 11),
  });
  f_0xf1 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 15),
  });
  f_0xf4 = field(AssetReferenceSuffix, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 12),
  });
  f_0xfc = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 13),
  });
  f_0x100 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 13),
  });
}
