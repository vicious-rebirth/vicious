import { ClassCodec, field } from "../core";

import { Action } from "./action";
import { AssetFromType } from "./asset";
import { ExpressionList } from "./expression";

export class IfExpression extends ClassCodec {
  __id = 118;

  base = field(Action);
  condition = field(AssetFromType);
  trueExpr = field(ExpressionList);
  falseExpr = field(ExpressionList);
}
