import { Class, field } from "../core";
import { AssetFromType } from "./asset";
import { U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { Label } from "./label";
import { ValueExpression } from "./valueExpression";

export class NavigationHeadingExpression extends Class {
  __id = 250;
  __offset = 0x5c7d0;

  base = field(ValueExpression);
  f_1 = field(U32, { condition: (ctx) => ctx.lt((ctx) => ctx.version(), 9) });
  f_2 = field(EntitySelector);
  f_0x30 = field(AssetFromType, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 6),
  });
  f_0x34 = field(U32);
  f_0x38 = field(U32);
  f_0x3c = field(Label, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 7),
  });
  f_0x54 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 9),
  });
}
