import { Class, field } from "../core";
import { F32 } from "./atomic";
import { ValueExpression } from "./valueExpression";

export class NetworkClientPropertyExpression extends Class {
  __id = 389;
  __offset = 0x33850;

  base = field(ValueExpression);
  property = field(F32);
}
