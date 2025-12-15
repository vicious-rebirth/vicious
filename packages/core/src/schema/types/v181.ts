import { ClassCodec, field } from "../core";

import { AssetFromTypeSizedList, AssetReference } from "./asset";
import { U32 } from "./atomic";
import { Named } from "./named";

export class V181 extends ClassCodec {
  __id = 181;

  base = field(Named);
  f_0x1c = field(U32);
  f_0x20 = field(AssetReference);
  f_0x24 = field(U32);
  f_0x28 = field(AssetFromTypeSizedList);
}
