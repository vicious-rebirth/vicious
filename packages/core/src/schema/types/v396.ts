import { ClassCodec, field } from "../core";

import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { V368 } from "./v368";

export class V396 extends ClassCodec {
  __id = 396;

  base = field(V368);
  f_1 = field(AssetFromTypeWrap);
  f_2 = field(U32);
}
