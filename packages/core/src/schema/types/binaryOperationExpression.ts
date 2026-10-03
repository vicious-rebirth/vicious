import { Class, field } from "../core";
import { AssetFromType } from "./asset";
import { U32 } from "./atomic";
import { ValueExpression } from "./valueExpression";

export class BinaryOperationExpression extends Class {
  __id = 111;
  __offset = 0x32870;

  base = field(ValueExpression);
  operation = field(U32);
  operands = field((ctx) => ctx.array(AssetFromType, 2));
}
