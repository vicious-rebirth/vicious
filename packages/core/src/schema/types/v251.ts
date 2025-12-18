import { Class, field } from "../core";
import { Action } from "./action";
import { BOOL } from "./atomic";
import { V302 } from "./v302";

export class V251 extends Class {
  __id = 251;
  __offset = 0x24e80;

  base = field(Action);
  f_0x08 = field(V302);
  f_0x1c = field(BOOL);
}
