import { Class, field } from "../core";

import { Action } from "./action";
import { AssetFromTypeWrap } from "./asset";
import { U32, BOOL } from "./atomic";

export class V459 extends Class {
  __id = 459;

  base = field(Action);
  f_1 = field(U32);
  f_0x0c = field(U32);
  f_0x10 = field(AssetFromTypeWrap);
  f_0x14 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
