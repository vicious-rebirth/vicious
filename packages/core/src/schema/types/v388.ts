import { Class, field } from "../core";

import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { V369 } from "./v369";

export class V388 extends Class {
  __id = 388;
  __offset = 0x29d00;

  base = field(V369);
  f_1 = field(U32);
  f_2 = field(AssetFromTypeWrap);
  f_0x0c = field(U32);
}
