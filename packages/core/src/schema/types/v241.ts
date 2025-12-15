import { ClassCodec, field } from "../core";

import { F32, U32 } from "./atomic";
import { V154 } from "./v154";

export class V241 extends ClassCodec {
  __id = 241;

  base = field(V154);
  f_0x50 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 9),
  });
  f_0x38 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x3c = field(F32);
  old = field(U32, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.gt((ctx) => ctx.version(), 2),
        (ctx) => ctx.lt((ctx) => ctx.version(), 10)
      ),
  });
  f_0x40 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0x44 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 6),
  });
  f_0x48 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 6),
  });
  f_0x4c = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 8),
  });
}
