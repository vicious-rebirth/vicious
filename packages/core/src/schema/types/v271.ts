import { Class, field } from "../core";
import { U32 } from "./atomic";
import { FN_0x21f40 } from "./fns";
import { V109 } from "./v109";
import { V301 } from "./v301";

export class V271 extends Class {
  __id = 271;
  __offset = 0x598e0;

  base = field(V109);
  f_0x04 = field(V301);
  f_0x30 = field(FN_0x21f40, {
    custom: (ctx) => {
      ctx.set(this.f_0x30.version, (ctx) => ctx.version());
      ctx.set(this.f_0x30.targetVersion, 2);
      ctx.walk();
    },
  });
  f_0x48 = field(U32);
}
