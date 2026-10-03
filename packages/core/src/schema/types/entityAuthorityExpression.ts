import { Class, field } from "../core";
import { EntitySelector } from "./entitySelector";
import { ValueExpression } from "./valueExpression";

export class EntityAuthorityExpression extends Class {
  __id = 415;
  __offset = 0x5a450;

  base = field(ValueExpression);
  entity = field(EntitySelector);
}
