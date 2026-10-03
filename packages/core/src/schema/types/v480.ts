import { Class, field } from "../core";
import { F32 } from "./atomic";
import { ValueExpression } from "./valueExpression";

export class V480 extends Class {
  __id = 480;
  __offset = 0x33850;

  base = field(ValueExpression);
  f_0x04 = field(F32);
}
