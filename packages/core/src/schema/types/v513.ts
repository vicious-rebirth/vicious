import { Class, deprecated, field } from "../core";

import { AssetReferenceSizedList } from "./asset";
import { F32, U8, U32 } from "./atomic";
import { V132 } from "./v132";

export class V513 extends Class {
  __id = 513;
  __offset = 0xb6520;

  base = field(V132);
  f_0x78 = field(U32);
  f_0x70 = field(U8);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 7));
  f_0x88 = field(F32);
  f_0x8c = field(F32);
  f_0x7c = field(AssetReferenceSizedList);
  __ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 7));
}
