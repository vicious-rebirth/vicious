import { ClassCodec, field } from "../core";

import { AssetFromType } from "./asset";
import { U32 } from "./atomic";
import { V108 } from "./v108";

export class V110 extends ClassCodec {
  __id = 110;

  base = field(V108);
  f_0x04 = field(U32);
  f_0x08 = field(AssetFromType);
}
