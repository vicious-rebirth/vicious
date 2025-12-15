import { Class, field } from "../core";

import { AssetReference } from "./asset";
import { Base } from "./base";

export class V315 extends Class {
  __id = 315;

  base = field(Base);
  f_0x08 = field(AssetReference);
  f_0x0c = field(AssetReference);
}
