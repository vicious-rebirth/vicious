import { ClassCodec, field } from "../core";

import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { V368 } from "./v368";

export class V255 extends ClassCodec {
  __id = 255;

  base = field(V368);
  f_1 = field(U32);
  f_2 = field(AssetFromTypeWrap);
  f_0xc = field(U32);
}
