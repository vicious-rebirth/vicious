import { Class, field } from "../core";

import { AssetFromTypeWrap } from "./asset";
import { U32, BOOL } from "./atomic";
import { V108 } from "./v108";

export class V282 extends Class {
  __id = 282;

  base = field(V108);
  f_0x08 = field(U32);
  f_0x10 = field(BOOL);
  f_0x04 = field(AssetFromTypeWrap);
  f_0x0c = field(AssetFromTypeWrap);
}
