import { Class, field } from "../core";
import { ExpressionList } from "./expression";
import { FN_0x22520 } from "./fns";
import { Statement } from "./statement";

export class V466 extends Class {
  __id = 466;
  __offset = 0x4cc70;

  base = field(Statement);
  f_1 = field(FN_0x22520);
  expressions = field(ExpressionList);
}
