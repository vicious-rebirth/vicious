import { Class, field } from "../core";

import { Action } from "./action";
import { AssetFromType } from "./asset";
import { ExpressionList } from "./expression";

export class IfExpression extends Class {
  __id = 118;
  __offset = 0x47470;

  base = field(Action);
  condition = field(AssetFromType);
  trueExpr = field(ExpressionList);
  falseExpr = field(ExpressionList);
}
