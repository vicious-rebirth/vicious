import { Class, field } from "../core";

import { AssetReference } from "./asset";
import { F32, U32 } from "./atomic";
import { Group } from "./group";
import { Object } from "./object";

export class SpriteGroup extends Class {
  __id = 62;

  base = field(Group);
}

export class Sprite extends Class {
  __id = 61;
  __folder = "Sprites";
  __ext = "spr";

  base = field(Object);
  f_0x40 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x44 = field(F32);
  f_0x48 = field(F32);
  material = field(AssetReference);
  f_0x50 = field(F32);
  f_0x54 = field(F32);
  f_0x58 = field(F32);
  f_0x5c = field(F32);
}
