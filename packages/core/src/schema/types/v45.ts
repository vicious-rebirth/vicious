import { Class, Struct, field } from "../core";

import { BOOL } from "./atomic";
import { U8Buffer } from "./buffer";
import { V23 } from "./v23";

export class V45 extends Class {
  __id = 45;

  base = field(V23);
  data = field(V45Body, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}

export class V45Body extends Struct {
  __metadata = true;

  enabled = field(BOOL);
  buffer = field(U8Buffer, {
    custom: (ctx) => {
      ctx.if(
        (ctx) => ctx.neq(this.enabled, 0),
        (ctx) => {
          ctx.set(this.buffer.consume, 1);
          ctx.walk();
        }
      );
    },
  });
}
