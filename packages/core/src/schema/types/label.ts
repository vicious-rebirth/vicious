import { Struct, field } from "../core";

import { U32, U16 } from "./atomic";
import { StringBuffer } from "./buffer";

export class LabelID extends Struct {
  __offset = 0xc8621;

  index = field(U16);
  unique = field(U16);
}

export class Label extends Struct {
  __offset = 0xc85f0;

  size = field(U32);
  buffer = field(StringBuffer, {
    custom: (ctx) => {
      ctx.set(this.buffer.size, 20);
      ctx.walk();
    },
  });
  id = field(LabelID);
}

export class LabelList extends Struct {
  __offset = 0x12150;

  count = field(U32);
  list = field((ctx) => ctx.list(Label), {
    custom: (ctx) => {
      ctx.allocate(this.list, this.count);
      ctx.for(this.count, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));
      });
    },
  });
}
