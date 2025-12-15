import { ClassCodec, field } from "../core";

import { U8 } from "./atomic";
import { ExpressionWrap } from "./expression";

export class Action extends ClassCodec {
  __id = 107;

  base = field(ExpressionWrap);
  t1 = field(U8, { condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1) });
  t2 = field(U8, { condition: (ctx) => ctx.eq((ctx) => ctx.version(), 2) });
}
