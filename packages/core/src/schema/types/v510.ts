import { ClassCodec, deprecated, field } from "../core";

import { U32 } from "./atomic";
import { V109 } from "./v109";

export class V510 extends ClassCodec {
  __id = 510;

  base = field(V109);
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 0));
  f_1 = field(U32);
}
