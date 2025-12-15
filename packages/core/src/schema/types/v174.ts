import { Class, field } from "../core";

import { F32Buffer } from "./buffer";
import { V173 } from "./v173";

export class V174 extends Class {
  __id = 174;

  base = field(V173);
  f_1 = field(F32Buffer, {
    custom: (ctx) => {
      ctx.set(this.f_1.consume, 1);
      ctx.walk(this.f_1);
    },
  });
}
