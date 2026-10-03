import { Class, field } from "../core";
import { Color } from "./math";
import { ShaderMaterial } from "./shaderMaterial";

export class V50 extends Class {
  __id = 50;
  __offset = 0x111470;

  base = field(ShaderMaterial);
  tint = field(Color);
}
