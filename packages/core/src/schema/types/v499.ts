import { Class, field } from "../core";
import { Action } from "./action";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";

export class V499 extends Class {
  __id = 499;
  __offset = 0x23240;

  base = field(Action);
  f_1 = field(U32);
  f_0x0c = field(U32);
  f_0x10 = field(AssetFromTypeWrap);
}
