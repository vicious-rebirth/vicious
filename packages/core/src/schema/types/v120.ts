import { Class, field } from "../core";

import { Action } from "./action";
import { AssetFromType } from "./asset";
import { U32 } from "./atomic";

export class V120 extends Class {
  __id = 120;
  __offset = 0x247f0;

  base = field(Action);
  f_0x08 = field(U32);
  f_0x0c = field(AssetFromType);
  f_0x10 = field(AssetFromType);
}
