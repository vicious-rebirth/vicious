import { Class, field } from "../core";

import { AssetFromType } from "./asset";
import { U32 } from "./atomic";
import { V108 } from "./v108";

export class V111 extends Class {
  __id = 111;
  __offset = 0x32870;

  base = field(V108);
  f_0x04 = field(U32);
  f_0x08 = field((ctx) => ctx.array(AssetFromType, 2));
}
