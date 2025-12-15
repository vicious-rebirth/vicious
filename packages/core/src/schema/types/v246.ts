import { Class, field } from "../core";

import { Action } from "./action";
import { AssetFromType } from "./asset";
import { U32 } from "./atomic";

export class V246 extends Class {
  __id = 246;
  __offset = 0x24370;

  base = field(Action);
  f_0x08 = field(U32);
  f_0x0c = field(AssetFromType);
}
