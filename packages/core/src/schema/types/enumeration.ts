import { ClassCodec, field } from "../core";

import { AssetFromTypeSizedList } from "./asset";
import { Group } from "./group";
import { Object } from "./object";

export class EnumerationGroup extends ClassCodec {
  __id = 172;

  base = field(Group);
}

export class Enumeration extends ClassCodec {
  __id = 171;
  __folder = "Enumerations";
  __ext = "enu";

  base = field(Object);
  children = field(AssetFromTypeSizedList);
}
