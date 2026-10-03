import { Class, Struct, field } from "../core";
import { ModelMaterial } from "./modelMaterial";

export class UntexturedModelMaterial extends Class {
  __id = 96;
  __offset = 0x116940;

  base = field(ModelMaterial);
  shader = field(UntexturedModelMaterialShader);
}

export class UntexturedModelMaterialShader extends Struct {
  __metadata = true;
  __offset = 0x10a130;
}
