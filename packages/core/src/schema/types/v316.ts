import { ClassCodec, field } from "../core";

import { AssetFromTypeSizedList } from "./asset";
import { V309 } from "./v309";

export class V316 extends ClassCodec {
  __id = 316;

  base = field(V309);
  f_0x4c = field(AssetFromTypeSizedList);
}
