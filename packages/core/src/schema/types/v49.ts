import { Class, deprecated, field } from "../core";

import { AssetReference } from "./asset";
import { F32, I32, U32, BOOL } from "./atomic";
import { Vector3 } from "./math";
import { V34 } from "./v34";

export class V49 extends Class {
  __id = 49;
  __offset = 0xebba0;

  base = field(V34);
  f_0x45 = field(BOOL);
  f_0x44 = field(BOOL);
  f_0x48 = field(U32);
  f_0x4c = field(U32);
  f_0x50 = field(Vector3);
  f_0x64 = field(AssetReference);
  f_0x68 = field(BOOL);
  f_0x69 = field(BOOL);
  f_0x6c = field(U32);
  f_0x70 = field(U32);
  f_0x74 = field(U32);
  f_0x78 = field(U32);
  f_0x7c = field(U32);
  f_0x94 = field(U32);
  f_0x98 = field(BOOL);
  f_0x9c = field(F32);
  f_0xa0 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0xa4 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0xa8 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0xac = field(U32);
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 1));
  f_0xb0 = field(F32, {
    condition: (ctx) => ctx.neq((ctx) => ctx.version(), 1),
  });
  __ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 5));
  f_0xb4 = field(U32, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 5),
  });
  ___ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 1));
  f_0xb8 = field(F32, {
    condition: (ctx) => ctx.neq((ctx) => ctx.version(), 1),
  });
  f_0xbc = field(F32);
  f_0xc0 = field(F32);
  f_0x5c = field(F32);
  f_0x60 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0xc4 = field(F32);
  f_0xcc = field(F32);
  f_0xc8 = field(F32);
  f_0xd0 = field(F32);
  f_0xd4 = field(BOOL);
  f_0xd8 = field(F32);
  f_0xdc = field(F32);
  f_0xe0 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0xe4 = field(U32);
  f_0xe8 = field(U32);
  f_0xec = field(I32);
  f_0xf0 = field(I32);
  f_0xf4 = field(F32);
  f_0xfc = field(F32);
  f_0xf8 = field(F32);
  f_0x100 = field(U32);
  f_0x104 = field(U32);
  f_0x108 = field(BOOL);
  f_0x10c = field(Vector3);
  f_0x118 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x80 = field(BOOL);
  f_0x84 = field(U32);
  f_0x88 = field(Vector3);
}
