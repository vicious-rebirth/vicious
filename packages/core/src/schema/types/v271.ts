import { Class, field } from "../core";
import { U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { FN_0x21f40 } from "./fns";
import { GameStateExpression } from "./gameStateExpression";

export class V271 extends Class {
  __id = 271;
  __offset = 0x598e0;

  base = field(GameStateExpression);
  f_0x04 = field(EntitySelector);
  f_0x30 = field(FN_0x21f40, {
    custom: (ctx) => {
      ctx.set(this.f_0x30.version, (ctx) => ctx.version());
      ctx.set(this.f_0x30.targetVersion, 2);
      ctx.walk();
    },
  });
  f_0x48 = field(U32);
}
