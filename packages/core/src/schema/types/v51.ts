import { ClassCodec, field } from "../core";

import { AssetReference } from "./asset";
import { Empty } from "./empty";
import { V50 } from "./v50";

export class V51 extends ClassCodec {
  __id = 51;

  base = field(V50);
  f_0x44 = field(AssetReference);
  empty = field(Empty);
}
