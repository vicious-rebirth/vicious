import { Class, field } from "../core";

import { AssetReference } from "./asset";
import { Empty } from "./empty";
import { V19 } from "./v19";

export class V94 extends Class {
  __id = 94;
  __offset = 0x1125a0;

  base = field(V19);
  f_0x44 = field(AssetReference);
  f_0x48 = field(AssetReference);
  empty = field(Empty);
}
