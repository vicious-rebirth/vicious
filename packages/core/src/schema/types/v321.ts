import { ClassCodec, field } from "../core";

import { AssetFromType } from "./asset";
import { V108 } from "./v108";

export class V321 extends ClassCodec {
  __id = 321;

  base = field(V108);
  f_0x04 = field(AssetFromType);
  f_0x08 = field(AssetFromType);
}
