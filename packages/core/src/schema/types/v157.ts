import { Class, field } from "../core";

import { AssetReference } from "./asset";
import { V109 } from "./v109";

export class V157 extends Class {
  __id = 157;
  __offset = 0x33140;

  base = field(V109);
  f_1 = field(AssetReference);
}
