import { ClassCodec, field } from "../core";

import { AssetReference } from "./asset";
import { F32 } from "./atomic";
import { StaticLight } from "./staticLight";

export class V79 extends ClassCodec {
  __id = 79;

  base = field(StaticLight);
  f_0x7c = field(F32);
  f_0x80 = field(F32);
  f_0x84 = field(AssetReference, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
