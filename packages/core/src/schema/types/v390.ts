import { Class, field } from "../core";

import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { V108 } from "./v108";

export class V390 extends Class {
  __id = 390;

  base = field(V108);
  f_1 = field(U32);
  f_0x0c = field(U32);
  f_2 = field(AssetFromTypeWrap);
}
