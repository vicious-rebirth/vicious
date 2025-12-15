import { Class, field } from "../core";

import { Group } from "./group";
import { Object } from "./object";

export class GeomTemplateGroup extends Class {
  __id = 31;

  base = field(Group);
}

export class GeomTemplate extends Class {
  __id = 32;
  __folder = "GeomTemplates";
  __ext = "gt";

  base = field(Object);
}
