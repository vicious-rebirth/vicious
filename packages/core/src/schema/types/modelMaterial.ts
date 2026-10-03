import { Class, field } from "../core";
import { U32 } from "./atomic";
import { Color } from "./math";
import { ShaderMaterial } from "./shaderMaterial";

export class ModelMaterial extends Class {
  __id = 19;
  __offset = 0x111de0;

  base = field(ShaderMaterial);
  tint = field(Color);
  f_0x64 = field(U32);
}
