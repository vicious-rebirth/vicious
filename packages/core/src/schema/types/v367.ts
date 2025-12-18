import { Class, field } from "../core";
import { Action } from "./action";
import { U32 } from "./atomic";
import { FN_0x22520 } from "./fns";
import { V366 } from "./v366";

export class V367 extends Class {
  __id = 367;
  __offset = 0x4b4b0;

  base = field(Action);
  f_1 = field(FN_0x22520);
  f_0x14 = field(U32);
  f_0x18 = field(V366);
}
