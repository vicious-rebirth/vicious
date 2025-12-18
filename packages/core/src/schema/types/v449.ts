import { Class, field } from "../core";
import { U32 } from "./atomic";
import { V108 } from "./v108";

export class V449 extends Class {
  __id = 449;
  __offset = 0x341b0;

  base = field(V108);
  f_1 = field(U32, { condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1) });
  f_2 = field(U32);
}
