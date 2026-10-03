import { Class, field } from "../core";
import { ShaderMaterial } from "./shaderMaterial";

export class HeightmapMaterial extends Class {
  __id = 81;
  __todo = true;
  __offset = 0x111470;

  base = field(ShaderMaterial);
}
