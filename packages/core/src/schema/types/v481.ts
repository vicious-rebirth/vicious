import { Class, field } from "../core";

import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { V369 } from "./v369";

export class V481 extends Class {
  __id = 481;
  __offset = 0x2db30;

  base = field(V369);
  f_1 = field(AssetFromTypeWrap);
  f_2 = field(U32);
}
