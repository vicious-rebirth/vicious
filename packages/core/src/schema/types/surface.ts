import { ClassCodec, field } from "../core";

import { F32, U32 } from "./atomic";
import { Group } from "./group";
import { Object } from "./object";

export class SurfaceGroup extends ClassCodec {
  __id = 58;

  base = field(Group);
}

export class Surface extends ClassCodec {
  __id = 57;
  __folder = "Surfaces";
  __ext = "srf";

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
