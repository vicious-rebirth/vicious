import { Class, field } from "../core";

import { AssetReference } from "./asset";
import { V109 } from "./v109";

export class V358 extends Class {
  __id = 358;

  base = field(V109);
  f_1 = field(AssetReference);
}
