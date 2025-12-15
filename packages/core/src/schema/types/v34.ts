import { Class, field } from "../core";

import { F32 } from "./atomic";
import { GeomTemplate } from "./geomTemplate";

export class V34 extends Class {
  __id = 34;
  __offset = 0xe2450;

  base = field(GeomTemplate);
  f_0x40 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
