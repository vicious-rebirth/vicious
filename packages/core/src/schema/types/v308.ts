import { Class, deprecated, field } from "../core";
import { Action } from "./action";
import { AssetFromTypeWrap, AssetReference } from "./asset";
import { U32 } from "./atomic";
import { V301 } from "./v301";

export class V308 extends Class {
  __id = 308;
  __offset = 0x45380;

  base = field(Action);
  f_0x08 = field(V301);
  f_0x38 = field(AssetFromTypeWrap);
  f_0x6c = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x70 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x3c = field(V301, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x68 = field(AssetReference, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x34 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 4));
  __ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 5));
  f_0x74 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 5),
  });
}
