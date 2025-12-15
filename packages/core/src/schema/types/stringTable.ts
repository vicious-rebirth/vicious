import { Class, field } from "../core";

import { AssetFromTypeSizedList } from "./asset";
import { Group } from "./group";
import { Object } from "./object";

export class StringTableGroup extends Class {
  __id = 136;
  __offset = 0x1a330;

  base = field(Group);
}

export class StringTable extends Class {
  __id = 284;
  __folder = "StringTables";
  __ext = "stb";
  __offset = 0x2f3c0;

  base = field(Object);
  strings = field(AssetFromTypeSizedList);
}
