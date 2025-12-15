import { Class, field } from "../core";

import { Action } from "./action";
import { AssetFromTypeWrap } from "./asset";
import { U32, BOOL } from "./atomic";

export class V454 extends Class {
  __id = 454;

  base = field(Action);
  f_1 = field(U32);
  f_0x0c = field(AssetFromTypeWrap);
  f_0x10 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
