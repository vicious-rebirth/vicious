import { Class, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { BOOL, U32 } from "./atomic";
import { ValueExpression } from "./valueExpression";

export class RandomRangeExpression extends Class {
  __id = 282;
  __offset = 0x34820;

  base = field(ValueExpression);
  mode = field(U32);
  integerResult = field(BOOL);
  minimumOrCenter = field(AssetFromTypeWrap);
  maximumOrRadius = field(AssetFromTypeWrap);
}
