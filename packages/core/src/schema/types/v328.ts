import { Class, field } from "../core";

import { Action } from "./action";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { FN_0x21f40 } from "./fns";
import { V301 } from "./v301";

export class V328 extends Class {
  __id = 328;
  __offset = 0x40ed0;

  base = field(Action);
  f_0x08 = field(V301);
  f_0x4c = field(AssetFromTypeWrap);
  f_0x34 = field(FN_0x21f40, {
    custom: (ctx) => {
      ctx.set(this.f_0x34.version, (ctx) => ctx.version());
      ctx.set(this.f_0x34.targetVersion, 2);
      ctx.walk();
    },
  });
  f_0x50 = field(U32);
}
