import { Class, field } from "../core";

import { BOOL } from "./atomic";
import { V108 } from "./v108";
import { V301 } from "./v301";
import { V421 } from "./v421";

export class V456 extends Class {
  __id = 456;
  __offset = 0x5b050;

  base = field(V108);
  f_0x04 = field(V301);
  f_0x30 = field(V421);
  f_0x48 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
