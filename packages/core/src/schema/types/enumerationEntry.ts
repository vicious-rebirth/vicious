import { Class, field } from "../core";

import { U32, BOOL } from "./atomic";
import { Named } from "./named";

export class EnumerationEntry extends Class {
  __id = 170;
  __offset = 0x27df0;

  base = field(Named);
  id = field(U32);
  enabled = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
