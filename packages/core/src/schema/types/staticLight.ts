import { Class, deprecated, field } from "../core";

import { F32, I32 } from "./atomic";
import { Group } from "./group";
import { Transform } from "./math";
import { Object } from "./object";

export class StaticLightGroup extends Class {
  __id = 80;

  base = field(Group);
}

export class StaticLight extends Class {
  __id = 74;
  __folder = "StaticLight";
  __ext = "lit";

  base = field(Object);
  f_0x40 = field(F32);
  f_0x44 = field(I32);
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 1));
  f_0x78 = field(I32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  transform = field(Transform);
}
