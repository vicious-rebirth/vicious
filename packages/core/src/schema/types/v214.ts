import { Class, field } from "../core";

import { Action } from "./action";
import { AssetFromType } from "./asset";
import { ExpressionList } from "./expression";

export class V214 extends Class {
  __id = 214;

  base = field(Action);
  target = field(AssetFromType);
  true_ = field(ExpressionList);
  false_ = field(ExpressionList);
}
