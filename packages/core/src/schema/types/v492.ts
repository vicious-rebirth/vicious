import { ClassCodec, field } from "../core";

import { AssetFromType } from "./asset";
import { BOOL } from "./atomic";
import { V108 } from "./v108";

export class V492 extends ClassCodec {
  __id = 492;

  base = field(V108);
  f_1 = field(AssetFromType);
  f_2 = field(AssetFromType);
  f_0x0c = field(BOOL);
}
