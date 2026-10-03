import { Class, field } from "../core";
import { F32 } from "./atomic";
import { ValueExpression } from "./valueExpression";

export class NetworkModeMatchExpression extends Class {
  __id = 386;
  __offset = 0x33850;

  base = field(ValueExpression);
  expectedMode = field(F32);
}
