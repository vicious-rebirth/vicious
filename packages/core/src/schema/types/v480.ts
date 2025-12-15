import { ClassCodec, field } from "../core";

import { F32 } from "./atomic";
import { V108 } from "./v108";

export class V480 extends ClassCodec {
  __id = 480;

  base = field(V108);
  f_0x04 = field(F32);
}
