import { ClassCodec, field } from "../core";

import { F32, U32 } from "./atomic";
import { Base } from "./base";
import { Matrix3, Vector3 } from "./math";

export class V296 extends ClassCodec {
  __id = 296;

  base = field(Base);
  f_1 = field(F32);
  f_2 = field(F32);
  f_0x0c = field(F32);
  f_0x10 = field(F32);
  f_0x14 = field(F32);
  f_0x18 = field(Matrix3);
  f_0x3c = field(Vector3);
  f_0x48 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}
