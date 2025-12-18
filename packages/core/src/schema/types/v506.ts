import { Class, field } from "../core";
import { Action } from "./action";
import { U32 } from "./atomic";
import { FN_0x22520 } from "./fns";

export class V506 extends Class {
  __id = 506;
  __offset = 0x4c130;

  base = field(Action);
  f_1 = field(FN_0x22520);
  f_0x14 = field(U32);
  f_0x18 = field(U32);
}
