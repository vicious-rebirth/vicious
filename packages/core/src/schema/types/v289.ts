import { Class, field } from "../core";

import { F32 } from "./atomic";
import { V296 } from "./v296";

export class V289 extends Class {
  __id = 289;
  __offset = 0x177730;

  base = field(V296);
  f_0x50 = field(F32);
  f_0x4c = field(F32);
  f_0x54 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
