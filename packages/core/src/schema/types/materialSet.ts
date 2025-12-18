import { Class, field } from "../core";
import { Group } from "./group";
import { SurfaceSet } from "./surfaceSet";

export class MaterialSetGroup extends Class {
  __id = 40;
  __offset = 0x1a330;

  base = field(Group);
}

export class MaterialSet extends Class {
  __id = 35;
  __folder = "MaterialSets";
  __ext = "ms";
  __offset = 0x117590;

  base = field(SurfaceSet);
}
