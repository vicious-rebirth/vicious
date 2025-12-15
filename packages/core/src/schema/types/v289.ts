import { ClassCodec, field } from "../core";

import { F32 } from "./atomic";
import { V296 } from "./v296";

export class V289 extends ClassCodec {
  __id = 289;

  base = field(V296);
  f_0x50 = field(F32);
  f_0x4c = field(F32);
  f_0x54 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
