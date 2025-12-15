import { Class, field } from "../core";

import { Action } from "./action";
import { BOOL } from "./atomic";
import { Label } from "./label";

export class V338 extends Class {
  __id = 338;

  base = field(Action);
  f_1 = field(Label);
  f_0x20 = field(BOOL);
}
