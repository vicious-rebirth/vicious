import { Class, field } from "../core";
import { EntitySelector } from "./entitySelector";
import { FN_0x21f40 } from "./fns";
import { ValueExpression } from "./valueExpression";

export class V273 extends Class {
  __id = 273;
  __offset = 0x59230;

  base = field(ValueExpression);
  f_0x08 = field(EntitySelector);
  f_1 = field(FN_0x21f40, {
    custom: (ctx) => {
      ctx.set(this.f_1.version, (ctx) => ctx.version());
      ctx.set(this.f_1.targetVersion, 2);
      ctx.walk();
    },
  });
}
