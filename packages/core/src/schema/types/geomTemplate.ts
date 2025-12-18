import { Class, field } from "../core";
import { Group } from "./group";
import { Object } from "./object";

export class GeomTemplateGroup extends Class {
  __id = 31;
  __offset = 0x1a330;

  base = field(Group);
}

export class GeomTemplate extends Class {
  __id = 32;
  __folder = "GeomTemplates";
  __ext = "gt";
  __offset = 0xd8910;

  base = field(Object);
}
