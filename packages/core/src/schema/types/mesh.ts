import { Class, field } from "../core";

import { F32, U32 } from "./atomic";
import { Group } from "./group";
import { Object } from "./object";

export class MeshGroup extends Class {
  __id = 15;
  __offset = 0x1a330;

  base = field(Group);
}

export class Mesh extends Class {
  __id = 14;
  __folder = "Meshes";
  __ext = "msh";
  __offset = 0xd8cb0;

  base = field(Object);
  f_0x40 = field(U32);
  transparency = field(F32);
  scale = field(F32, { condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2) });
  inverseScale = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}
