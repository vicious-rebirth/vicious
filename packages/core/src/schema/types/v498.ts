import { Class, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { U8, U32 } from "./atomic";
import { FN_0x5e2d0 } from "./fns";
import { Label } from "./label";
import { V380 } from "./v380";

export class V498 extends Class {
  __id = 498;
  __offset = 0x62450;

  base = field(V380);
  f_0x58 = field(U32);
  f_1 = field(FN_0x5e2d0);
  f_2 = field((ctx) => ctx.array(U8, 8), {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 3),
  });
  f_0x60 = field(Label);
  f_0x78 = field(AssetFromTypeWrap);
  f_3 = field(U32, { condition: (ctx) => ctx.lt((ctx) => ctx.version(), 4) });
  f_0x80 = field(U32);
  f_0x7c = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
