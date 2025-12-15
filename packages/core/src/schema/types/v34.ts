import { ClassCodec, field } from "../core";

import { F32 } from "./atomic";
import { GeomTemplate } from "./geomTemplate";

export class V34 extends ClassCodec {
  __id = 34;

  base = field(GeomTemplate);
  f_0x40 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
