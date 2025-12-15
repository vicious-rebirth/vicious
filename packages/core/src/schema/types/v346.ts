import { ClassCodec, field } from "../core";

import { ExpressionList } from "./expression";
import { V343 } from "./v343";

export class V346 extends ClassCodec {
  __id = 346;

  base = field(V343);
  f_0x60 = field(ExpressionList);
}
