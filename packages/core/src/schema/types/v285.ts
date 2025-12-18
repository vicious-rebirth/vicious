import { Class, deprecated, field } from "../core";
import { Action } from "./action";
import { AssetFromTypeWrap } from "./asset";
import { BOOL } from "./atomic";
import { V301 } from "./v301";

export class V285 extends Class {
  __id = 285;
  __offset = 0x44c10;

  base = field(Action);
  f_1 = field(V301);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 3));
  f_0x34 = field(AssetFromTypeWrap);
  f_0x39 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0x38 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
