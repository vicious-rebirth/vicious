import { Class, field } from "../core";

import { AssetReference } from "./asset";
import { V108 } from "./v108";

export class V158 extends Class {
  __id = 158;
  __offset = 0x32f60;

  base = field(V108);
  f_1 = field(AssetReference);
}
