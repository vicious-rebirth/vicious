import { Class, deprecated, field } from "../core";

import { AssetReference, AssetReferenceSizedList } from "./asset";
import { F32, BOOL } from "./atomic";
import { F32Buffer } from "./buffer";
import { V33 } from "./v33";

export class V30 extends Class {
  __id = 30;
  __offset = 0x113800;

  base = field(V33);
  mesh = field(AssetReference);
  materialSets = field(AssetReferenceSizedList);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 3));
  surfaces = field(AssetReferenceSizedList);
  f_0x4c = field(F32);
  f_1 = field(F32Buffer, {
    custom: (ctx) => {
      ctx.set(this.f_1.consume, true);
      ctx.walk(this.f_1);
    },
  });
  f_0x54 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
