import { Class, field } from "../core";
import { F32, U32 } from "./atomic";
import { V315 } from "./v315";

export class V317 extends Class {
  __id = 317;
  __offset = 0xf9a30;

  base = field(V315);
  f_0x0c = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x10 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x14 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
