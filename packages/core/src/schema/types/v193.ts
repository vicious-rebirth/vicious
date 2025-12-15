import { ClassCodec, field } from "../core";

import { Action } from "./action";
import { AssetFromTypeWrap, AssetReference } from "./asset";
import { U32 } from "./atomic";
import { FN_0x21f40 } from "./fns";
import { V301 } from "./v301";
import { V511 } from "./v511";

export class V193 extends ClassCodec {
  __id = 193;

  base = field(Action);
  f_0x08 = field(V301);
  f_0x38 = field(FN_0x21f40, {
    custom: (ctx) => {
      ctx.set(this.f_0x38.version, (ctx) => ctx.version());
      ctx.set(this.f_0x38.targetVersion, 2);
      ctx.walk(this.f_0x38);
    },
  });
  f_0x34 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x50_1 = field(V511, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 5),
  });
  f_0x50_2 = field(AssetReference, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 5),
  });
  f_0x64 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
}
