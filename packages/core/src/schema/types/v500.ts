import { Class, field } from "../core";

import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { V108 } from "./v108";

export class V500 extends Class {
  __id = 500;
  __offset = 0x338d0;

  base = field(V108);
  f_1 = field(U32);
  f_0x00 = field(AssetFromTypeWrap);
}
