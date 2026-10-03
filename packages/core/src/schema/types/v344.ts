import { Class, field } from "../core";
import { EntitySelector } from "./entitySelector";
import { ValueExpression } from "./valueExpression";

export class V344 extends Class {
  __id = 344;
  __offset = 0x5a450;

  base = field(ValueExpression);
  f_0x04 = field(EntitySelector);
}
