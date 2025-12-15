import { ClassCodec, field } from "../core";

import { AssetFromTypeWrap } from "./asset";
import { V109 } from "./v109";
import { V301 } from "./v301";

export class V482 extends ClassCodec {
  __id = 482;

  base = field(V109);
  v301 = field(V301);
  f_0x30 = field(AssetFromTypeWrap);
}
