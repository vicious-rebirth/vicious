import { Struct, field } from "../core";
import { F32, U8, U32 } from "./atomic";

export class Color extends Struct {
  __doc = `
    Color stored in BGRA format
  `;

  b = field(U8);
  g = field(U8);
  r = field(U8);
  a = field(U8);
}

export class Dimension extends Struct {
  width = field(F32);
  height = field(F32);
}

export class Vector3 extends Struct {
  x = field(F32);
  y = field(F32);
  z = field(F32);
}

export class Matrix3 extends Struct {
  r00 = field(F32);
  r10 = field(F32);
  r20 = field(F32);
  r01 = field(F32);
  r11 = field(F32);
  r21 = field(F32);
  r02 = field(F32);
  r12 = field(F32);
  r22 = field(F32);
}

export class Rotation3 extends Struct {
  r00 = field(F32);
  r10 = field(F32);
  r20 = field(F32);
  r01 = field(F32);
  r11 = field(F32);
  r21 = field(F32);
  r02 = field(F32);
  r12 = field(F32);
  r22 = field(F32);
}

export class Transform extends Struct {
  position = field(Vector3);
  rotation = field(Rotation3);
}

export class TransformList extends Struct {
  __offset = 0x11de20;

  count = field(U32);
  list = field((ctx) => ctx.list(Transform), {
    custom: (ctx) => {
      ctx.allocate(this.list, this.count);

      ctx.for(this.count, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));
      });
    },
  });
}
