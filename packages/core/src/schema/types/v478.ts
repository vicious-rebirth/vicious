import { Class, field } from "../core";
import { Action } from "./action";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { FN_0x22520 } from "./fns";

export class V478 extends Class {
  __id = 478;
  __offset = 0x4afc0;

  base = field(Action);
  f_1 = field(FN_0x22520);
  f_0x14 = field(AssetFromTypeWrap);
  f_0x18 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
