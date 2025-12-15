import { ClassCodec, deprecated, field } from "../core";

import { Script } from "./script";
import { Surface } from "./surface";

export class V126 extends ClassCodec {
  __id = 126;

  base = field(Surface);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  onTouched = field(Script);
}
