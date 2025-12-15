import { ClassCodec, deprecated, field } from "../core";

import { AssetFromType } from "./asset";
import { U32 } from "./atomic";
import { V133 } from "./v133";

export class V134 extends ClassCodec {
  __id = 134;

  base = field(V133);
  f_0xa4 = field(U32);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 3));
  f_0x98 = field(AssetFromType);
}
