import { Class, field } from "../core";
import { BOOL, U32 } from "./atomic";
import { ValueExpression } from "./valueExpression";

export class MapLoadStatusExpression extends Class {
  __id = 400;
  __offset = 0x34030;

  base = field(ValueExpression);
  property = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_2 = field(BOOL);
}
