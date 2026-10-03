import { Class, Struct, deprecated, field } from "../core";
import { AssetFromType, AssetReference } from "./asset";
import { U32 } from "./atomic";
import { ModelMaterial } from "./modelMaterial";
import { TextureCoordinateAnimation } from "./textureCoordinateAnimation";

export class DualTextureModelMaterial extends Class {
  __id = 73;
  __offset = 0x113e30;

  base = field(ModelMaterial);
  albedo = field(AssetReference);
  specular = field(AssetReference);
  textureAnimation1 = field(TextureCoordinateAnimation);
  textureAnimation2 = field(TextureCoordinateAnimation);
  f_0x6c = field(U32);
  f_0x70 = field(U32);
  f_0x15c = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  shader = field(DualTextureModelMaterialShader);
}

export class DualTextureModelMaterialShader extends Struct {
  __metadata = true;
  __offset = 0xf7410;

  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 0));
  f_0x160 = field(AssetFromType, {
    condition: (ctx) => ctx.neq((ctx) => ctx.version(), 0),
  });
}
