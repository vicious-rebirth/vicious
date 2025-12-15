import { ClassCodec, field } from "../core";

import { AssetReference } from "./asset";
import { Texture } from "./texture";

export class V309 extends ClassCodec {
  __id = 309;

  base = field(Texture);
  f_0x4c = field(AssetReference);
}
