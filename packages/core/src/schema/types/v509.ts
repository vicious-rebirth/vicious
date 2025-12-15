import { ClassCodec, field } from "../core";

import { Action } from "./action";
import { AssetFromTypeSizedList, AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";

export class V509 extends ClassCodec {
  __id = 509;

  base = field(Action);
  f_0x08 = field(U32);
  f_0x0c = field(AssetFromTypeSizedList);
  f_0x14 = field(AssetFromTypeWrap);
}
