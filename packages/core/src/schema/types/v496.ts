import { ClassCodec, field } from "../core";

import { U32 } from "./atomic";
import { V108 } from "./v108";

export class V496 extends ClassCodec {
  __id = 496;

  base = field(V108);
  f_1 = field(U32);
  f_2 = field(U32);
}
