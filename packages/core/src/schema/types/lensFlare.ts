import { Class, field } from "../core";

import { AssetFromTypeSizedList } from "./asset";
import { U32 } from "./atomic";
import { Object } from "./object";

export class LensFlare extends Class {
  __id = 411;
  __folder = "LensFlare";
  __ext = "lfl";

  base = field(Object);
  f_0x40 = field(AssetFromTypeSizedList);
  f_1 = field(U32, { condition: (ctx) => ctx.eq((ctx) => ctx.version(), 4) });
  f_0x48 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
