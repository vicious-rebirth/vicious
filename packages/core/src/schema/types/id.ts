import { Struct, field } from "../core";

import { U32 } from "./atomic";

export class ID extends Struct {
  __offset = 0x1e350;

  low = field(U32);
  high = field(U32);
}

export class IDList extends Struct {
  __offset = 0x1e490;

  count = field(U32);
  list = field((ctx) => ctx.list(ID), {
    custom: (ctx) => {
      ctx.allocate(this.list, this.count);
      ctx.for(this.count, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));
      });
    },
  });
}
