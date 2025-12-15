import { Class, field } from "../core";

import { AssetReferenceSizedList } from "./asset";
import { Group } from "./group";
import { Color } from "./math";
import { Object } from "./object";

export class SkyGroup extends Class {
  __id = 474;

  base = field(Group);
}

export class Sky extends Class {
  __id = 473;
  __folder = "Skies";
  __ext = "sky";

  base = field(Object);
  tint = field(Color, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x44 = field(AssetReferenceSizedList);
}
