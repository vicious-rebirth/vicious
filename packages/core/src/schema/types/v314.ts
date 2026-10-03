import { Class, Struct, field } from "../core";
import { AssetFromType, AssetReference } from "./asset";
import { F32, U32 } from "./atomic";
import { ModelMaterial } from "./modelMaterial";
import { TextureCoordinateAnimation } from "./textureCoordinateAnimation";

export class V314 extends Class {
  __id = 314;
  __offset = 0x112990;

  base = field(ModelMaterial);
  f_0x44 = field(AssetReference);
  f_0x48 = field(AssetReference);
  f_0x74 = field(TextureCoordinateAnimation);
  f_0x6c = field(U32);
  f_0x70 = field(U32);
  f_0xe8 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0xec = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_1 = field(V314_1);
}

export class V314_1 extends Struct {
  __metadata = true;
  __offset = 0xf5760;

  f_1 = field(AssetFromType);
}
