import { Class, field } from "../core";
import { Action } from "./action";
import { U32 } from "./atomic";
import { FN_0x21f40 } from "./fns";
import { V301 } from "./v301";

export class V266 extends Class {
  __id = 266;
  __offset = 0x3fd50;

  base = field(Action);
  f_0x08 = field(V301);
  f_0x34 = field(U32);
  f_0x38 = field(FN_0x21f40, {
    custom: (ctx) => {
      ctx.set(this.f_0x38.version, (ctx) => ctx.version());
      ctx.set(this.f_0x38.targetVersion, 2);
      ctx.walk(this.f_0x38);
    },
  });
}
