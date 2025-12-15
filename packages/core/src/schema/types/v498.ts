import { ClassCodec, field } from "../core";

import { AssetFromTypeWrap } from "./asset";
import { U32, U8 } from "./atomic";
import { FN_0x5e2d0 } from "./fns";
import { Label } from "./label";
import { V380 } from "./v380";

export class V498 extends ClassCodec {
  __id = 498;

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
