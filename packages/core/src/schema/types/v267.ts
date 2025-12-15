import { Class, field } from "../core";

import { Action } from "./action";
import { AssetFromType, AssetFromTypeSizedList } from "./asset";
import { FN_0x21f40 } from "./fns";
import { V301 } from "./v301";

export class V267 extends Class {
  __id = 267;
  __offset = 0x43aa0;

  base = field(Action);
  f_0x04 = field(V301);
  f_1 = field(FN_0x21f40, {
    custom: (ctx) => {
      ctx.set(this.f_1.version, (ctx) => ctx.version());
      ctx.set(this.f_1.targetVersion, 3);
      ctx.walk(this.f_1);
    },
  });
  f_2 = field(FN_0x21f40, {
    custom: (ctx) => {
      ctx.set(this.f_2.version, (ctx) => ctx.version());
      ctx.set(this.f_2.targetVersion, 3);
      ctx.walk(this.f_2);
    },
  });
  f_0x64 = field(AssetFromTypeSizedList);
  f_0x6c = field(AssetFromType, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}
