import { Class, field } from "../core";
import { AssetFromType } from "./asset";
import { ExpressionList } from "./expression";
import { Statement } from "./statement";

export class IfStatement extends Class {
  __id = 118;
  __offset = 0x47470;

  base = field(Statement);
  condition = field(AssetFromType);
  trueExpr = field(ExpressionList);
  falseExpr = field(ExpressionList);
}
