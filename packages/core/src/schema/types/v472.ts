import { Class, field } from "../core";

import { Action } from "./action";
import { AssetReference } from "./asset";
import { U32 } from "./atomic";
import { Label } from "./label";
import { V301 } from "./v301";
import { V333 } from "./v333";

export class V472 extends Class {
  __id = 472;
  __offset = 0x44480;

  base = field(Action);
  f_0x00 = field(V301);
  f_0x34 = field(U32);
  f_0x38 = field(U32);
  f_0x3c_1 = field(V333, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 3),
  });
  f_0x3c_2 = field(AssetReference, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 3),
  });
  f_0x50 = field(V301);
  f_0x7c = field(Label);
}
