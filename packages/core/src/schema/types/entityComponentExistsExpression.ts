import { Class, field } from "../core";
import { BOOL } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { V421 } from "./v421";
import { ValueExpression } from "./valueExpression";

export class EntityComponentExistsExpression extends Class {
  __id = 456;
  __offset = 0x5b050;

  base = field(ValueExpression);
  entity = field(EntitySelector);
  component = field(V421);
  requireEnabled = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
