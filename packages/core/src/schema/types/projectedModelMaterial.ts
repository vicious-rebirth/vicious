import { Class, field } from "../core";
import { AssetReference } from "./asset";
import { Empty } from "./empty";
import { ModelMaterial } from "./modelMaterial";

export class ProjectedModelMaterial extends Class {
  __id = 94;
  __offset = 0x1125a0;

  base = field(ModelMaterial);
  albedo = field(AssetReference);
  f_0x48 = field(AssetReference);
  empty = field(Empty, {
    offset: 0xf50d0,
  });
}
