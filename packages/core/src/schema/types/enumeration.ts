import { Class, field } from "../core";

import { AssetFromTypeSizedList } from "./asset";
import { Group } from "./group";
import { Object } from "./object";

export class EnumerationGroup extends Class {
  __id = 172;
  __offset = 0x1a330;

  base = field(Group);
}

export class Enumeration extends Class {
  __id = 171;
  __folder = "Enumerations";
  __ext = "enu";
  __offset = 0x27e90;

  base = field(Object);
  children = field(AssetFromTypeSizedList);
}
