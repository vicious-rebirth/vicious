import { Class, field } from "../core";

import { AssetReference } from "./asset";
import { Texture } from "./texture";

export class V309 extends Class {
  __id = 309;

  base = field(Texture);
  f_0x4c = field(AssetReference);
}
