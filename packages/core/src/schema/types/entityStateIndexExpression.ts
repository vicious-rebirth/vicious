import { Class, field } from "../core";
import { U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { ValueExpression } from "./valueExpression";

export class EntityStateIndexExpression extends Class {
  __id = 457;
  __offset = 0x59b00;

  base = field(ValueExpression);
  entity = field(EntitySelector);
  property = field(U32);
}
