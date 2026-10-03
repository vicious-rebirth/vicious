import { Class, field } from "../core";
import { HeightmapMaterial } from "./heightmapMaterial";

export class TexturedHeightmapMaterial extends Class {
  __id = 82;
  __todo = true;
  __offset = 0x113470;

  base = field(HeightmapMaterial);
}
