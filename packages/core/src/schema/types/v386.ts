import { ClassCodec, field } from "../core";

import { F32 } from "./atomic";
import { V108 } from "./v108";

export class V386 extends ClassCodec {
  __id = 386;

  base = field(V108);
  f_0x04 = field(F32);
}
