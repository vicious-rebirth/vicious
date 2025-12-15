import { ClassCodec, field } from "../core";

import { AssetReference } from "./asset";
import { V109 } from "./v109";

export class V157 extends ClassCodec {
  __id = 157;

  base = field(V109);
  f_1 = field(AssetReference);
}
