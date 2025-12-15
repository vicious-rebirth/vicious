import { Class, field } from "../core";

import { AssetFromType } from "./asset";
import { U32 } from "./atomic";
import { Label } from "./label";
import { V108 } from "./v108";
import { V301 } from "./v301";

export class V250 extends Class {
  __id = 250;

  base = field(V108);
  f_1 = field(U32, { condition: (ctx) => ctx.lt((ctx) => ctx.version(), 9) });
  f_2 = field(V301);
  f_0x30 = field(AssetFromType, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 6),
  });
  f_0x34 = field(U32);
  f_0x38 = field(U32);
  f_0x3c = field(Label, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 7),
  });
  f_0x54 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 9),
  });
}
