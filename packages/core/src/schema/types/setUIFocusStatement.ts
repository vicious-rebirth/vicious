import { Class, deprecated, field } from "../core";
import { FN_0x22520 } from "./fns";
import { Statement } from "./statement";

export class SetUIFocusStatement extends Class {
  __id = 337;
  __offset = 0x4ae90;

  base = field(Statement);
  _ = deprecated((ctx) => ctx.lte((ctx) => ctx.version(), 1));
  target = field(FN_0x22520, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
