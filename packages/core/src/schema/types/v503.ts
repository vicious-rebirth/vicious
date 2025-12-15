import { Class, field } from "../core";

import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { V368 } from "./v368";

export class V503 extends Class {
  __id = 503;

  base = field(V368);
  f_1 = field(AssetFromTypeWrap);
  f_2 = field(U32);
}
