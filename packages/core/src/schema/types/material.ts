import { ClassCodec, field } from "../core";

import { U32 } from "./atomic";
import { Group } from "./group";
import { Object } from "./object";

export class MaterialGroup extends ClassCodec {
  __id = 17;

  base = field(Group);
}

export class Material extends ClassCodec {
  __id = 16;
  __folder = "Materials";
  __ext = "mtl";

  base = field(Object);
  version = field(U32);
}
