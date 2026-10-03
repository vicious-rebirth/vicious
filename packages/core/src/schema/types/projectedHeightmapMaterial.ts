import { Class, field } from "../core";
import { HeightmapMaterial } from "./heightmapMaterial";

export class ProjectedHeightmapMaterial extends Class {
  __id = 95;
  __todo = true;
  __offset = 0x1124e0;

  base = field(HeightmapMaterial);
}
