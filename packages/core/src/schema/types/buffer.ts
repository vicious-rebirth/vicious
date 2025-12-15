import { Struct, field } from "../core";

import { F32, U32, U16, U8, BOOL } from "./atomic";

export class U8Buffer extends Struct {
  consume = field(BOOL, { skip: true });
  size = field(U32, { condition: (ctx) => ctx.neq(this.consume, 0) });
  data = field((ctx) => ctx.list(U8), {
    custom: (ctx) => {
      ctx.allocate(this.data, this.size);

      ctx.forward(this.data, this.size);
    },
  });
}

export class U16Buffer extends Struct {
  consume = field(BOOL, { skip: true });
  count = field(U32, { condition: (ctx) => ctx.neq(this.consume, 0) });
  data = field((ctx) => ctx.list(U16), {
    custom: (ctx) => {
      ctx.allocate(this.data, this.count);

      ctx.forward(this.data, this.count);
    },
  });
}

export class StringBuffer extends Struct {
  consume = field(BOOL, { skip: true });
  size = field(U32, { condition: (ctx) => ctx.neq(this.consume, 0) });
  data = field((ctx) => ctx.list(U8), {
    custom: (ctx) => {
      ctx.allocate(this.data, this.size);

      ctx.forward(this.data, this.size);
    },
  });
}

export class F32Buffer extends Struct {
  consume = field(BOOL, { skip: true });
  count = field(U32, { condition: (ctx) => ctx.neq(this.consume, 0) });
  data = field((ctx) => ctx.list(F32), {
    custom: (ctx) => {
      ctx.allocate(this.data, this.count);

      ctx.forward(this.data, this.count);
    },
  });
}
