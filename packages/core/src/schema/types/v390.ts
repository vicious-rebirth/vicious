import { Class, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { ValueExpression } from "./valueExpression";

export class V390 extends Class {
  __id = 390;
  __offset = 0x33620;

  base = field(ValueExpression);
  f_1 = field(U32);
  f_0x0c = field(U32);
  f_2 = field(AssetFromTypeWrap);
}
