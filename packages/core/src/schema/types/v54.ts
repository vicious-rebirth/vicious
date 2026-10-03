import { Class, field } from "../core";
import { U32 } from "./atomic";
import { ShaderMaterial } from "./shaderMaterial";

export class V54 extends Class {
  __id = 54;
  __offset = 0x111470;

  base = field(ShaderMaterial);
  f_0x60 = field(U32);
}
