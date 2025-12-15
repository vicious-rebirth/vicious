import { Class, field } from "../core";

import { AssetFromTypeSizedList } from "./asset";
import { Group } from "./group";
import { Object } from "./object";

export class StringTableGroup extends Class {
  __id = 136;

  base = field(Group);
}

export class StringTable extends Class {
  __id = 284;
  __folder = "StringTables";
  __ext = "stb";

  base = field(Object);
  strings = field(AssetFromTypeSizedList);
}
