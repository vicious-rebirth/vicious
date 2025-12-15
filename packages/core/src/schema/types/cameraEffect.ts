import { Class, field } from "../core";

import { AssetFromTypeSizedList } from "./asset";
import { F32, BOOL } from "./atomic";
import { Group } from "./group";
import { Object } from "./object";

export class CameraEffectGroup extends Class {
  __id = 433;

  base = field(Group);
}

export class CameraEffect extends Class {
  __id = 97;
  __folder = "CameraEffects";
  __ext = "cfx";

  base = field(Object);
  f_0x40 = field(AssetFromTypeSizedList);
  f_0x48 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x49 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x4c = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x50 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x54 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x58 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}
