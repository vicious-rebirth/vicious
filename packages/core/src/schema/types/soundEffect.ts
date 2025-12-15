import { Class, field } from "../core";

import { F32 } from "./atomic";
import { Sound } from "./sound";

export class SoundEffect extends Class {
  __id = 42;

  base = field(Sound);
  f_0x54 = field(F32, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 2),
    custom: (ctx) => {
      ctx.walk(this.f_0x54);
      ctx.set(this.base.f_0x54, this.f_0x54);
    },
  });
}
