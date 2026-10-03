import { Class, field } from "../core";
import { F32 } from "./atomic";
import { ValueExpression } from "./valueExpression";

export class FloatLiteralExpression extends Class {
  __id = 114;
  __offset = 0x33850;

  base = field(ValueExpression);
  value = field(F32);
}
