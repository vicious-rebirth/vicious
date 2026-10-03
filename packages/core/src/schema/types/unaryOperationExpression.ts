import { Class, field } from "../core";
import { AssetFromType } from "./asset";
import { U32 } from "./atomic";
import { ValueExpression } from "./valueExpression";

export class UnaryOperationExpression extends Class {
  __id = 110;
  __offset = 0x353d0;

  base = field(ValueExpression);
  operation = field(U32);
  operand = field(AssetFromType);
}
