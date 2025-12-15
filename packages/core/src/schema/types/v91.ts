import { Class, field } from "../core";

import { AssetReferenceSizedList } from "./asset";
import { U32 } from "./atomic";
import { V34 } from "./v34";

export class V91 extends Class {
  __id = 91;

  base = field(V34);
  f_0x44 = field(AssetReferenceSizedList);
  f_0x48 = field(U32);
}
