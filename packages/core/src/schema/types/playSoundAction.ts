import { Class, field } from "../core";
import { Action } from "./action";
import { AssetFromTypeWrap, AssetReference } from "./asset";
import { BOOL } from "./atomic";
import { V301 } from "./v301";
import { V422 } from "./v422";

export class PlaySoundAction extends Class {
  __id = 335;
  __offset = 0x432d0;

  base = field(Action);
  f_0x08 = field(AssetFromTypeWrap);
  f_0x0c = field(V301);
  f_0x38_1 = field(V422, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 3),
  });
  f_0x38_2 = field(AssetReference, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 3),
  });
  f_0x4c = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
