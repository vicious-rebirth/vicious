import { Class, field } from "../core";
import { U8 } from "./atomic";
import { ExpressionWrap } from "./expression";

export class Action extends Class {
  __id = 107;
  __offset = 0x1e5c0;

  base = field(ExpressionWrap);
  t1 = field(U8, { condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1) });
  t2 = field(U8, { condition: (ctx) => ctx.eq((ctx) => ctx.version(), 2) });
}
