import { Class, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { ValueExpression } from "./valueExpression";

export class V453 extends Class {
  __id = 453;
  __offset = 0x33d10;

  base = field(ValueExpression);
  flags = field(U32);
  f_1 = field(U32);
  self = field(AssetFromTypeWrap);
}
