import { Class, field } from "../core";
import { AssetFromType } from "./asset";
import { ValueExpression } from "./valueExpression";

export class ObjectEqualsExpression extends Class {
  __id = 321;
  __offset = 0x4ae90;

  base = field(ValueExpression);
  left = field(AssetFromType);
  right = field(AssetFromType);
}
