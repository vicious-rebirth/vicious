import { Class, field } from "../core";
import { BOOL } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { EntityTemplateSelector } from "./entityTemplateSelector";
import { ValueExpression } from "./valueExpression";

export class EntityExistsExpression extends Class {
  __id = 228;
  __offset = 0x59690;

  base = field(ValueExpression);
  entity = field(EntitySelector);
  template = field(EntityTemplateSelector, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  matchTemplate = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
