import { Class, deprecated, field } from "../core";
import { FN_0x22520 } from "./fns";
import { GameStateExpression } from "./gameStateExpression";

export class V149 extends Class {
  __id = 149;
  __offset = 0x5d640;

  base = field(GameStateExpression);
  f_1 = field(FN_0x22520, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  _ = deprecated((ctx) => ctx.lte((ctx) => ctx.version(), 1));
}
