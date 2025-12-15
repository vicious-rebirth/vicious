import { ClassCodec, field } from "../core";

import { AssetReferenceSizedList } from "./asset";
import { Group } from "./group";
import { Object } from "./object";

export class SkinGroup extends ClassCodec {
  __id = 70;

  base = field(Group);
}

export class Skin extends ClassCodec {
  __id = 69;
  __folder = "Skins";
  __ext = "skn";

  base = field(Object);
  f_0x40 = field(AssetReferenceSizedList);
  f_0x44 = field(AssetReferenceSizedList);
}
