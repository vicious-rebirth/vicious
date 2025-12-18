import { Class, field } from "../core";
import { U32 } from "./atomic";
import { V108 } from "./v108";
import { V301 } from "./v301";

export class V137 extends Class {
  __id = 137;
  __offset = 0x57e30;

  base = field(V108);
  f_0x30 = field(U32);
  f_0x34 = field(U32);
  f_1 = field(V301, { condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1) });
}
