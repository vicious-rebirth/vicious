import { Class, field } from "../core";
import { AssetReferenceSizedList } from "./asset";
import { Group } from "./group";
import { Object } from "./object";

export class SkinGroup extends Class {
  __id = 70;
  __offset = 0x1a330;

  base = field(Group);
}

export class Skin extends Class {
  __id = 69;
  __folder = "Skins";
  __ext = "skn";
  __offset = 0x112d20;

  base = field(Object);
  materialSets = field(AssetReferenceSizedList);
  surfaceSets = field(AssetReferenceSizedList);
}
