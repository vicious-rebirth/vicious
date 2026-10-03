import { Class, deprecated, field } from "../core";
import { FN_0x22520 } from "./fns";
import { GameStateExpression } from "./gameStateExpression";

export class V148 extends Class {
  __id = 148;
  __offset = 0x5d640;

  base = field(GameStateExpression);
  f_1 = field(FN_0x22520, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  _ = deprecated((ctx) => ctx.lte((ctx) => ctx.version(), 1));
}
