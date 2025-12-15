import { Class, field } from "../core";

import { AssetReferenceSizedList } from "./asset";
import { F32, BOOL } from "./atomic";
import { V34 } from "./v34";

export class V89 extends Class {
  __id = 89;
  __offset = 0x1126f0;

  base = field(V34);
  f_0x44 = field(AssetReferenceSizedList);
  f_0x48 = field(BOOL);
  f_0x4c = field(F32);
  f_0x58 = field(F32);
  f_0x5c = field(F32);
  f_0x50 = field(F32);
  f_0x54 = field(F32);
}
