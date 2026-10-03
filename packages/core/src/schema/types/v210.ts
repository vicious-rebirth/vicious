import { Class, field } from "../core";
import { EntitySelector } from "./entitySelector";
import { FN_0x21f40 } from "./fns";
import { GameStateExpression } from "./gameStateExpression";

export class V210 extends Class {
  __id = 210;
  __offset = 0x5a280;

  base = field(GameStateExpression);
  f_0x08 = field(EntitySelector);
  f_1 = field(FN_0x21f40, {
    custom: (ctx) => {
      ctx.set(this.f_1.version, (ctx) => ctx.version());
      ctx.set(this.f_1.targetVersion, 2);
      ctx.walk(this.f_1);
    },
  });
}
