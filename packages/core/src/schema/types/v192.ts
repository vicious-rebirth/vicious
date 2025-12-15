import { Class, deprecated, field } from "../core";

import { Action } from "./action";
import { AssetFromType, AssetFromTypeSizedList } from "./asset";
import { U32, BOOL } from "./atomic";
import { FN_0x21f40 } from "./fns";
import { V301 } from "./v301";

export class V192 extends Class {
  __id = 192;
  __offset = 0x436a0;

  base = field(Action);
  _ = deprecated((ctx) => ctx.lte((ctx) => ctx.version(), 2));
  f_1 = field(V301);
  f_2 = field(FN_0x21f40, {
    custom: (ctx) => {
      ctx.set(this.f_2.version, (ctx) => ctx.version());
      ctx.set(this.f_2.targetVersion, 5);
      ctx.walk(this.f_2);
    },
  });
  f_0x4c = field(AssetFromTypeSizedList);
  f_0x54 = field(AssetFromType, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  f_0x58 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0x5c = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 5),
  });
}
