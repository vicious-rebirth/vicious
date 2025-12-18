import { Class, field } from "../core";
import { Action } from "./action";
import { AssetFromType } from "./asset";

export class V119 extends Class {
  __id = 119;
  __offset = 0x24130;

  base = field(Action);
  f_0x08 = field(AssetFromType);
}
