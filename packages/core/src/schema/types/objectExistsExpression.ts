import { Class, field } from "../core";
import { AssetFromType } from "./asset";
import { ValueExpression } from "./valueExpression";

export class ObjectExistsExpression extends Class {
  __id = 444;
  __offset = 0x34760;

  base = field(ValueExpression);
  object = field(AssetFromType);
}
