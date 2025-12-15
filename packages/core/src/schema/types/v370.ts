import { ClassCodec, field } from "../core";

import { U32 } from "./atomic";
import { V108 } from "./v108";

export class V370 extends ClassCodec {
  __id = 370;

  // Should be V369
  base = field(V108);
  f_1 = field(U32);
}
