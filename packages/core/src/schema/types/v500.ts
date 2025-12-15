import { ClassCodec, field } from "../core";

import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { V108 } from "./v108";

export class V500 extends ClassCodec {
  __id = 500;

  base = field(V108);
  f_1 = field(U32);
  f_0x00 = field(AssetFromTypeWrap);
}
