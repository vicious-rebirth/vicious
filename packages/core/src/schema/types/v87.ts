import { Class, field } from "../core";

import { AssetReference, AssetReferenceSizedList } from "./asset";
import { F32, BOOL } from "./atomic";
import { V34 } from "./v34";

export class V87 extends Class {
  __id = 87;
  __offset = 0x112bf0;

  base = field(V34);
  f_0x44 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0x48 = field(AssetReference);
  f_0x4c = field(AssetReference, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x50 = field(AssetReferenceSizedList);
  f_0x54 = field(F32);
  f_0x58 = field(F32);
  f_0x5c = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
}
