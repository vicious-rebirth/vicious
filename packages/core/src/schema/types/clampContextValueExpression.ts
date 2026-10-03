import { Class, field } from "../core";
import { AssetFromType } from "./asset";
import { ValueExpression } from "./valueExpression";

export class ClampContextValueExpression extends Class {
  __id = 208;
  __offset = 0x24c40;

  base = field(ValueExpression);
  bounds = field((ctx) => ctx.array(AssetFromType, 2));
}
