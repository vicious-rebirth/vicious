import { ClassCodec, field } from "../core";

import { AssetFromType } from "./asset";
import { V108 } from "./v108";

export class V444 extends ClassCodec {
  __id = 444;

  base = field(V108);
  f_0x04 = field(AssetFromType);
}
