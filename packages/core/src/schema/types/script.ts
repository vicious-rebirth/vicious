import { ClassCodec, deprecated, field } from "../core";

import { Base } from "./base";
import { ExpressionList } from "./expression";
import { ID } from "./id";

export class Script extends ClassCodec {
  __id = 105;

  base = field(Base);
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 0));
  code = field(ExpressionList);
  id = field(ID, { condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1) });
}
