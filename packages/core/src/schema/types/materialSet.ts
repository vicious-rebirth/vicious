import { Class, field } from "../core";

import { Group } from "./group";
import { SurfaceSet } from "./surfaceSet";

export class MaterialSetGroup extends Class {
  __id = 40;

  base = field(Group);
}

export class MaterialSet extends Class {
  __id = 35;
  __folder = "MaterialSets";
  __ext = "ms";

  base = field(SurfaceSet);
}
