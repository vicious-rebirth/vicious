import { Class, field } from "../core";
import { U32 } from "./atomic";
import { ValueExpression } from "./valueExpression";

export class NetworkStateMatchExpression extends Class {
  __id = 496;
  __offset = 0x33c80;

  base = field(ValueExpression);
  property = field(U32);
  expectedValue = field(U32);
}
