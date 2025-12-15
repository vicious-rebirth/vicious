import { Class, field } from "../core";

import { Action } from "./action";
import { AssetFromType } from "./asset";

export class V312 extends Class {
  __id = 312;
  __offset = 0x245e0;

  base = field(Action);
  F_0x08 = field(AssetFromType);
  F_0x0c = field(AssetFromType);
}
