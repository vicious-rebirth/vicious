import { Class, field } from "../core";

import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { V108 } from "./v108";

export class V458 extends Class {
  __id = 458;

  base = field(V108);
  flags = field(U32);
  f_1 = field(U32);
  self = field(AssetFromTypeWrap);
}
