import { ClassCodec, field } from "../core";

import { Action } from "./action";
import { AssetFromTypeWrap } from "./asset";
import { V166 } from "./v166";

export class V416 extends ClassCodec {
  __id = 416;

  base = field(Action);
  v166 = field(V166);
  f_0x40 = field(AssetFromTypeWrap);
  f_0x44 = field(AssetFromTypeWrap);
}
