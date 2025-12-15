import { Class, field } from "../core";

import { Action } from "./action";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { Label } from "./label";
import { V301 } from "./v301";
import { V333 } from "./v333";

export class V448 extends Class {
  __id = 448;

  base = field(Action);
  f_0x0c = field(V301);
  f_0x38 = field(AssetFromTypeWrap);
  f_0x68 = field(V333, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x3c = field(V301, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x7c = field(Label, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x04 = field(U32);
  f_0x94 = field(AssetFromTypeWrap);
  f_0x98 = field(AssetFromTypeWrap);
}
