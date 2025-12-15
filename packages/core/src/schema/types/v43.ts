import { Class, deprecated, field } from "../core";

import { AssetReference } from "./asset";
import { U32 } from "./atomic";
import { Base } from "./base";

export class V43 extends Class {
  __id = 43;
  __offset = 0xe1440;

  base = field(Base);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  f_0x4 = field(U32);
  f_0x8 = field(AssetReference);
}
