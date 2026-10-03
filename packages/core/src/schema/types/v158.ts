import { Class, field } from "../core";
import { AssetReference } from "./asset";
import { ValueExpression } from "./valueExpression";

export class V158 extends Class {
  __id = 158;
  __offset = 0x32f60;

  base = field(ValueExpression);
  f_1 = field(AssetReference);
}
