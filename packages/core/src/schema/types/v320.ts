import { Class, deprecated, field } from "../core";
import { AssetFromType } from "./asset";
import { BOOL } from "./atomic";
import { FN_0x21f40 } from "./fns";
import { ValueExpression } from "./valueExpression";

export class V320 extends Class {
  __id = 320;
  __offset = 0x72e60;

  base = field(ValueExpression);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  f_0x08 = field(AssetFromType, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_1 = field(FN_0x21f40, {
    custom: (ctx) => {
      ctx.set(this.f_1.version, (ctx) => ctx.version());
      ctx.set(this.f_1.targetVersion, 3);
      ctx.walk();
    },
  });
  f_0x20 = field(BOOL);
}
