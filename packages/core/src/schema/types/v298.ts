import { ClassCodec, MetadataCodec, deprecated, field } from "../core";

import { V19 } from "./v19";

export class V298 extends ClassCodec {
  __id = 298;

  base = field(V19);
  f_1 = field(V298_1);
}

export class V298_1 extends MetadataCodec {
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 0));
}
