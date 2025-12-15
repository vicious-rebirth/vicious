import { Class, field } from "../core";

import { AssetReference } from "./asset";
import { F32, U32, BOOL } from "./atomic";
import { V34 } from "./v34";

export class V53 extends Class {
  __id = 53;

  base = field(V34);
  f_0x44 = field(AssetReference);
  f_0x48 = field(U32);
  f_0x4c = field(U32);
  f_0x50 = field(U32);
  f_0x54 = field(F32);
  f_0x58 = field(F32);
  f_0x5c = field(BOOL);
}
