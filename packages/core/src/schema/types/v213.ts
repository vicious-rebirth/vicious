import { Class, field } from "../core";
import { AssetReference } from "./asset";
import { EntitySelector } from "./entitySelector";
import { ValueExpression } from "./valueExpression";

export class V213 extends Class {
  __id = 213;
  __offset = 0x59330;

  base = field(ValueExpression);
  f_0x04 = field(EntitySelector);
  f_1 = field(AssetReference);
}
