import { ClassCodec, field } from "../core";

import { Action } from "./action";
import { AssetFromType, AssetReference } from "./asset";
import { ExpressionList } from "./expression";

export class V420 extends ClassCodec {
  __id = 420;

  base = field(Action);
  f_0x08 = field(AssetFromType);
  f_0x0c = field(AssetReference);
  f_0x10 = field(ExpressionList);
}
