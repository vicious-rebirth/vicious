import { ClassCodec, field } from "../core";

import { FN_0x224c0, FN_0x22080 } from "./fns";
import { V300 } from "./v300";

export class V508 extends ClassCodec {
  __id = 508;

  base = field(V300);
  f_1 = field(FN_0x22080);
  f_2 = field(FN_0x224c0);
}
