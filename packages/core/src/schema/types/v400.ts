import { Class, field } from "../core";

import { U32, BOOL } from "./atomic";
import { V108 } from "./v108";

export class V400 extends Class {
  __id = 400;

  base = field(V108);
  f_1 = field(U32, { condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1) });
  f_2 = field(BOOL);
}
