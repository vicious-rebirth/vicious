import { Class, field } from "../core";
import { BOOL, F32 } from "./atomic";
import { Base } from "./base";

export class V72 extends Class {
  __id = 72;
  __offset = 0xd7660;

  base = field(Base);
  f_0x04 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x08 = field(F32);
  f_0x0c = field(F32);
  f_0x10 = field(F32);
  f_0x14 = field(F32);
  f_0x18 = field(F32);
}
