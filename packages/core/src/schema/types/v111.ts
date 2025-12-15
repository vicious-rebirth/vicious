import { ClassCodec, field } from "../core";

import { AssetFromType } from "./asset";
import { U32 } from "./atomic";
import { V108 } from "./v108";

export class V111 extends ClassCodec {
  __id = 111;

  base = field(V108);
  f_0x04 = field(U32);
  f_0x08 = field((ctx) => ctx.array(AssetFromType, 2));
}
