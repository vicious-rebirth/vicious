import { ClassCodec, field } from "../core";

import { Action } from "./action";
import { ExpressionList } from "./expression";
import { FN_0x22520 } from "./fns";

export class V466 extends ClassCodec {
  __id = 466;

  base = field(Action);
  f_1 = field(FN_0x22520);
  expressions = field(ExpressionList);
}
