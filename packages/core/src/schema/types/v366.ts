import { Class, field } from "../core";

import { FN_0x21dd0, FN_0x22080 } from "./fns";
import { V300 } from "./v300";

export class V366 extends Class {
  __id = 366;
  __offset = 0x3d2f0;

  base = field(V300);
  f_1 = field(FN_0x22080);
  f_2 = field(FN_0x21dd0);
}
