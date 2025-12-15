import { ClassCodec, deprecated, field } from "../core";

import { AssetReferenceSizedList } from "./asset";
import { U32 } from "./atomic";
import { V512 } from "./v512";

export class V371 extends ClassCodec {
  __id = 371;

  base = field(V512);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 3));
  f_0xd0 = field(U32);
  f_0xd8 = field(U32);
  f_0xd4 = field(AssetReferenceSizedList);
  __ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 4));
}
