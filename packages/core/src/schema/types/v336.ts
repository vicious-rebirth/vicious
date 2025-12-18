import { Class, field } from "../core";
import { Action } from "./action";
import { BOOL, U32 } from "./atomic";
import { V166 } from "./v166";

export class V336 extends Class {
  __id = 336;
  __offset = 0x3e860;

  base = field(Action);
  f_1 = field(V166);
  f_0x40 = field(U32);
  f_0x44 = field(U32);
  f_0x48 = field(U32);
  f_0x4c = field(BOOL);
}
