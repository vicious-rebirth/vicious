import { ClassCodec, field } from "../core";

import { Group } from "./group";
import { SurfaceSet } from "./surfaceSet";

export class MaterialSetGroup extends ClassCodec {
  __id = 40;

  base = field(Group);
}

export class MaterialSet extends ClassCodec {
  __id = 35;
  __folder = "MaterialSets";
  __ext = "ms";

  base = field(SurfaceSet);
}
