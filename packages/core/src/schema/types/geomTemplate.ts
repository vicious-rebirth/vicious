import { ClassCodec, field } from "../core";

import { Group } from "./group";
import { Object } from "./object";

export class GeomTemplateGroup extends ClassCodec {
  __id = 31;

  base = field(Group);
}

export class GeomTemplate extends ClassCodec {
  __id = 32;
  __folder = "GeomTemplates";
  __ext = "gt";

  base = field(Object);
}
