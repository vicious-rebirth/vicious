import { Class, field } from "../core";
import { AssetReference } from "./asset";
import { U32 } from "./atomic";
import { Empty } from "./empty";
import { ModelMaterial } from "./modelMaterial";
import { TextureCoordinateAnimation } from "./textureCoordinateAnimation";

export class V287 extends Class {
  __id = 287;
  __offset = 0x1127e0;

  base = field(ModelMaterial);
  f_0x44 = field(AssetReference);
  f_0x48 = field(AssetReference);
  f_0x74 = field(TextureCoordinateAnimation);
  f_0x6c = field(U32);
  f_0x70 = field(U32);
  f_0xe8 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  empty = field(Empty, { offset: 0xf5460 });
}
