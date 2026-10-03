import { Class, field } from "../core";
import { V421 } from "./v421";
import { ValueExpression } from "./valueExpression";

export class AssetElementIndexExpression extends Class {
  __id = 341;
  __offset = 0x5a450;

  base = field(ValueExpression);
  element = field(V421);
}
