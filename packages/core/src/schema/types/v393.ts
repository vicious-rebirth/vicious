import { Class, field } from "../core";

import { Action } from "./action";
import { U32, BOOL } from "./atomic";
import { Vector3 } from "./math";
import { V301 } from "./v301";

export class V393 extends Class {
  __id = 393;
  __offset = 0x41250;

  base = field(Action);
  v301 = field(V301);
  f_0x34 = field(Vector3);
  f_0x40 = field(U32);
  f_0x44 = field(BOOL);
}
