import { Class, field } from "../core";

import { Base } from "./base";
import { Script } from "./script";

export class V380 extends Class {
  __id = 380;

  base = field(Base);
  onAcquired = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  onUnacquired = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  onUpdate = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
