import { Class, field } from "../core";
import { U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { ValueExpression } from "./valueExpression";

export class ControllerInputExpression extends Class {
  __id = 137;
  __offset = 0x57e30;

  base = field(ValueExpression);
  property = field(U32);
  inputIndex = field(U32);
  entity = field(EntitySelector, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
