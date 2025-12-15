import { ClassCodec, field } from "../core";

import { Action } from "./action";
import { AssetFromType } from "./asset";

export class V119 extends ClassCodec {
  __id = 119;

  base = field(Action);
  f_0x08 = field(AssetFromType);
}
