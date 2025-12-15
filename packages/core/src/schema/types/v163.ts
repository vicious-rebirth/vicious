import { ClassCodec, field } from "../core";

import { Action } from "./action";
import { AssetFromType, AssetFromTypeWrap, AssetReference } from "./asset";
import { U32, BOOL } from "./atomic";
import { V166 } from "./v166";

export class V163 extends ClassCodec {
  __id = 163;

  base = field(Action);
  f_0x08 = field(U32);
  f_0x0c = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x10 = field(V166);
  f_0x4c = field(AssetFromType);
  f_0x48 = field(AssetReference, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x50 = field(AssetFromType, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x54 = field(BOOL);
  f_0x58 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}
