import { Class, field } from "../core";

import { F32, U32 } from "./atomic";
import { Base } from "./base";

export class V252 extends Class {
  __id = 252;

  base = field(Base);
  f_0x04 = field(U32);
  f_0x08 = field(F32);
  f_0x0c = field(U32);
  f_0x10 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x14 = field(F32);
}
