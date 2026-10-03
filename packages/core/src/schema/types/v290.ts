import { Class, field } from "../core";
import { ModelMaterial } from "./modelMaterial";

export class V290 extends Class {
  __id = 290;
  __todo = true;
  __offset = 0x114230;

  base = field(ModelMaterial);
}
