import { ClassCodec, field } from "../core";

import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { V108 } from "./v108";
import { V421 } from "./v421";

export class V494 extends ClassCodec {
  __id = 494;

  // TODO: Should be V369
  base = field(V108);
  f_1 = field(AssetFromTypeWrap);
  f_2 = field(U32);
  f_0x0c = field(V421);
}
