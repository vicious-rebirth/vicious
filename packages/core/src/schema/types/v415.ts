import { ClassCodec, field } from "../core";

import { V108 } from "./v108";
import { V301 } from "./v301";

export class V415 extends ClassCodec {
  __id = 415;

  base = field(V108);
  f_0x04 = field(V301);
}
