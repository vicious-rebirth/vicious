import { Class, field } from "../core";
import { HeightmapMaterial } from "./heightmapMaterial";

export class UntexturedHeightmapMaterial extends Class {
  __id = 9;
  __todo = true;
  __offset = 0x1168c0;

  base = field(HeightmapMaterial);
}
