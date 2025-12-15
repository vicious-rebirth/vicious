import { Class, field } from "../core";

import { U32 } from "./atomic";
import { Material } from "./material";
import { Color } from "./math";

export class V63 extends Class {
  __id = 63;
  __offset = 0xedc80;

  base = field(Material);
  f_0x58 = field(U32);
  tint = field(Color, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
