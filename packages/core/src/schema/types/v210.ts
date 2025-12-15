import { ClassCodec, field } from "../core";

import { FN_0x21f40 } from "./fns";
import { V109 } from "./v109";
import { V301 } from "./v301";

export class V210 extends ClassCodec {
  __id = 210;

  base = field(V109);
  f_0x08 = field(V301);
  f_1 = field(FN_0x21f40, {
    custom: (ctx) => {
      ctx.set(this.f_1.version, (ctx) => ctx.version());
      ctx.set(this.f_1.targetVersion, 2);
      ctx.walk(this.f_1);
    },
  });
}
