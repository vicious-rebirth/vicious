import { Class, field } from "../core";

import { AssetReferenceSizedList } from "./asset";
import { Group } from "./group";
import { Object } from "./object";

export class SurfaceSetGroup extends Class {
  __id = 60;
  __offset = 0x1a330;

  base = field(Group);
}

export class SurfaceSet extends Class {
  __id = 59;
  __folder = "SurfaceSet";
  __ext = "ss";
  __offset = 0x111d60;

  base = field(Object);
  materials = field(AssetReferenceSizedList);
}
