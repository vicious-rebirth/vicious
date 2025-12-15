import { ClassCodec, field } from "../core";

import { AssetFromTypeSizedList } from "./asset";
import { V173 } from "./v173";

export class V327 extends ClassCodec {
  __id = 327;

  base = field(V173);
  f_0x08 = field(AssetFromTypeSizedList);
}
