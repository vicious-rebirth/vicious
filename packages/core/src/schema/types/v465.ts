import { Class, field } from "../core";

import { Action } from "./action";
import { AssetFromType } from "./asset";
import { ExpressionList } from "./expression";

export class V465 extends Class {
  __id = 465;
  __offset = 0x4cf50;

  base = field(Action);
  f_0x08 = field(AssetFromType);
  f_0x0c = field(ExpressionList);
}
