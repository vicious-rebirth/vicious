import { ClassCodec, field } from "../core";

import { AssetReference } from "./asset";
import { V108 } from "./v108";

export class V158 extends ClassCodec {
  __id = 158;

  base = field(V108);
  f_1 = field(AssetReference);
}
