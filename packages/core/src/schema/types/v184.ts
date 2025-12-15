import { ClassCodec, field } from "../core";

import { AssetReference } from "./asset";
import { V154 } from "./v154";

export class V184 extends ClassCodec {
  __id = 184;

  base = field(V154);
  f_0x10 = field(AssetReference, {
    condition: (ctx) => ctx.eq((ctx) => ctx.version(), 1),
  });
}
