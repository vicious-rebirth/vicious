import { Class, field } from "../core";

import { AssetReferenceSizedList } from "./asset";
import { Group } from "./group";
import { Color } from "./math";
import { Object } from "./object";

export class SkyGroup extends Class {
  __id = 474;
  __offset = 0x1a330;

  base = field(Group);
}

export class Sky extends Class {
  __id = 473;
  __folder = "Skies";
  __ext = "sky";
  __offset = 0x1131b0;

  base = field(Object);
  tint = field(Color, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x44 = field(AssetReferenceSizedList);
}
