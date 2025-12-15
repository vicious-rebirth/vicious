import { ClassCodec, field } from "../core";

import { AssetReference } from "./asset";
import { U32, U16 } from "./atomic";
import { F32Buffer } from "./buffer";
import { V513 } from "./v513";

export class V512 extends ClassCodec {
  __id = 512;

  base = field(V513);
  f_0x90 = field(AssetReference);
  f_0x94 = field(U32);
  f_0x1c = field(U32);
  f_0xa8 = field(U16);
  f_0xaa = field(U16);
  f_0xac = field(U16);
  f_0xae = field(U16);
  f_0xc0 = field(AssetReference);
  f_0xa4 = field(U32);
  f_0xb0 = field(U32);
  f_0xb4 = field(U32);
  f_0xb8 = field(U32);
  f_0xbc = field(U32);
  f_0xc4 = field(U16);
  f_0xc6 = field(U16);
  f_0x18 = field(U32);
  f_0xa0 = field(F32Buffer, {
    custom: (ctx) => {
      ctx.set(this.f_0xa0.consume, 1);
      ctx.walk(this.f_0xa0);
    },
  });
}
