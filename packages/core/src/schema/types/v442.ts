import { Class, Struct, field } from "../core";

import { U32, U16 } from "./atomic";
import { Base } from "./base";

export class V442 extends Class {
  __id = 442;
  __offset = 0x111d00;

  base = field(Base);
  f_1 = field(V442EntryList);
}

export class V442Entry extends Struct {
  f_1 = field(U16);
  f_2 = field(U16);
  f_3 = field(U16);
  f_4 = field(U16, {
    condition: (ctx) => ctx.eq((ctx) => ctx.band(this.f_1, 1), 0),
  });
}

export class V442EntryList extends Struct {
  count = field(U32);
  list = field((ctx) => ctx.list(V442Entry), {
    custom: (ctx) => {
      ctx.allocate(this.list, this.count);

      ctx.for(this.count, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));
      });
    },
  });
}
