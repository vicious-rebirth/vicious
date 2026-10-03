import { Class, field } from "../core";
import { AssetFromType } from "./asset";
import { BOOL } from "./atomic";
import { ValueExpression } from "./valueExpression";

export class StringEqualsExpression extends Class {
  __id = 492;
  __offset = 0x34cf0;

  base = field(ValueExpression);
  left = field(AssetFromType);
  right = field(AssetFromType);
  ignoreCase = field(BOOL);
}
