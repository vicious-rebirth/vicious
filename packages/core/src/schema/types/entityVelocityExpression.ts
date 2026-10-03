import { Class, field } from "../core";
import { U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { ValueExpression } from "./valueExpression";

export class EntityVelocityExpression extends Class {
  __id = 311;
  __offset = 0x5a380;

  base = field(ValueExpression);
  entity = field(EntitySelector);
  property = field(U32);
}
