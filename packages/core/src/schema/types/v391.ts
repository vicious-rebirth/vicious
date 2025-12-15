import { Class, deprecated, field } from "../core";

import { Base } from "./base";

export class V391 extends Class {
  __id = 391;

  base = field(Base);
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 0));
}
