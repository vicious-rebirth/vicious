import { Class, field } from "../core";

import { F32, U32 } from "./atomic";
import { Group } from "./group";
import { Object } from "./object";

export class SurfaceGroup extends Class {
  __id = 58;
  __offset = 0x1a330;

  base = field(Group);
}

export class Surface extends Class {
  __id = 57;
  __folder = "Surfaces";
  __ext = "srf";
  __offset = 0xee9b0;

  base = field(Object);
  f_0x48 = field(U32, {
    condition: (ctx) => ctx.neq((ctx) => ctx.version(), 2),
  });
  f_0x4c = field(U32);
  f_0x50 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  f_0x54 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  f_0x58 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 5),
  });
  f_0x5c = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 5),
  });
  f_0x44 = field(U32);
}
