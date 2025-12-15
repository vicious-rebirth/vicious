import { Class, field } from "../core";

import { Action } from "./action";
import { AssetReference } from "./asset";
import { U32, BOOL } from "./atomic";
import { V166 } from "./v166";

export class V427 extends Class {
  __id = 427;

  base = field(Action);
  f_0x08 = field(V166);
  f_0x40 = field(BOOL);
  f_0x48 = field(U32);
  f_0x4c = field(AssetReference);
  f_0x44 = field(U32);
}
