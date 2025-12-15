import { Class, field } from "../core";

import { FN_0x21f40 } from "./fns";
import { V108 } from "./v108";
import { V301 } from "./v301";

export class V274 extends Class {
  __id = 274;

  base = field(V108);
  f_0x08 = field(V301);
  f_1 = field(FN_0x21f40, {
    custom: (ctx) => {
      ctx.set(this.f_1.version, (ctx) => ctx.version());
      ctx.set(this.f_1.targetVersion, 2);
      ctx.walk();
    },
  });
}
