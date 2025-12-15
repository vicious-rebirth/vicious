import { ClassCodec, field } from "../core";

import { F32 } from "./atomic";
import { StaticLight } from "./staticLight";

export class V78 extends ClassCodec {
  __id = 78;

  base = field(StaticLight);
  f_0x7c = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
