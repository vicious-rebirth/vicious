import { ClassCodec, field } from "../core";

import { BOOL } from "./atomic";
import { V309 } from "./v309";

export class V313 extends ClassCodec {
  __id = 313;

  base = field(V309);
  f_0x4c = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
