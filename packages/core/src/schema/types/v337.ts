import { Class, deprecated, field } from "../core";
import { Action } from "./action";
import { FN_0x22520 } from "./fns";

export class V337 extends Class {
  __id = 337;
  __offset = 0x4ae90;

  base = field(Action);
  _ = deprecated((ctx) => ctx.lte((ctx) => ctx.version(), 1));
  f_1 = field(FN_0x22520, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
