import { Class, field } from "../core";

import { Action } from "./action";
import { AssetFromType, AssetFromTypeSizedList } from "./asset";
import { BOOL } from "./atomic";
import { FN_0x22520 } from "./fns";
import { V421 } from "./v421";

export class V514 extends Class {
  __id = 514;

  base = field(Action);
  f_1 = field(FN_0x22520);
  v421 = field(V421);
  f_0x2c = field(AssetFromTypeSizedList);
  f_0x34 = field(AssetFromType);
  f_0x38 = field(BOOL);
}
