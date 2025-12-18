import { Class, field } from "../core";
import { BOOL } from "./atomic";
import { V108 } from "./v108";
import { V301 } from "./v301";
import { V422 } from "./v422";

export class V228 extends Class {
  __id = 228;
  __offset = 0x59690;

  base = field(V108);
  v301 = field(V301);
  f_0x34 = field(V422, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x30 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
