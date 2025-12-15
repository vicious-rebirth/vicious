import { ClassCodec, field } from "../core";

import { U32, BOOL } from "./atomic";
import { Named } from "./named";

export class EnumerationEntry extends ClassCodec {
  __id = 170;

  base = field(Named);
  id = field(U32);
  enabled = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
