import { Class, Struct, deprecated, field } from "../core";

import { U32, U8 } from "./atomic";
import { Base } from "./base";

export class V71 extends Class {
  __id = 71;
  __offset = 0x107430;

  base = field(Base);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  f_0x04 = field(U8, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x05 = field(U8, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x06 = field(U8, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x07 = field(U8, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x08 = field(U8, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x09 = field(U8, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x0c = field((ctx) => ctx.array(V71_1, 5));
}

export class V71_1 extends Struct {
  __offset = 0x10757d;

  f_1 = field(U32);
  f_2 = field((ctx) => ctx.array(U8, 16));
}
