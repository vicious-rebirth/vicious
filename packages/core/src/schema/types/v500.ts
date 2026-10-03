import { Class, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { ValueExpression } from "./valueExpression";

export class V500 extends Class {
  __id = 500;
  __offset = 0x338d0;

  base = field(ValueExpression);
  f_1 = field(U32);
  f_0x00 = field(AssetFromTypeWrap);
}
