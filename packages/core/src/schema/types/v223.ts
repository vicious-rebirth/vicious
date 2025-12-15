import { Class, field } from "../core";

import { Action } from "./action";
import { BOOL } from "./atomic";
import { V303 } from "./v303";

export class V223 extends Class {
  __id = 223;

  base = field(Action);
  f_0x08 = field(V303);
  f_0x1c = field(BOOL);
  f_0x1d = field(BOOL);
}
