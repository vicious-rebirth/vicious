import { ClassCodec, field } from "../core";

import { Action } from "./action";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";

export class V394 extends ClassCodec {
  __id = 394;

  base = field(Action);
  f_1 = field(U32);
  f_0x0c = field(AssetFromTypeWrap);
}
