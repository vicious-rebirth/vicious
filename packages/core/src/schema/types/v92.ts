import { Class, field } from "../core";

import { AssetFromType } from "./asset";
import { F32 } from "./atomic";
import { Base } from "./base";
import { Vector3 } from "./math";

export class V92 extends Class {
  __id = 92;
  __offset = 0x114fe0;

  base = field(Base);
  f_1 = field(Vector3);
  f_2 = field(F32);
  f_0x54 = field(AssetFromType, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
