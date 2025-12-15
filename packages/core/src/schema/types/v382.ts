import { ClassCodec, field } from "../core";

import { AssetFromTypeWrap } from "./asset";
import { F32, U32 } from "./atomic";
import { FN_0x5e2d0 } from "./fns";
import { ID } from "./id";
import { Label } from "./label";
import { V380 } from "./v380";

export class V382 extends ClassCodec {
  __id = 382;

  base = field(V380);
  f_0x58 = field(U32);
  f_1 = field(FN_0x5e2d0);
  f_0x60 = field(AssetFromTypeWrap);
  f_0x64 = field(AssetFromTypeWrap);
  f_0x70 = field(AssetFromTypeWrap);
  f_0x74 = field(AssetFromTypeWrap);
  f_0x78 = field(AssetFromTypeWrap);
  f_0xac = field(Label);
  f_0xc4 = field(Label);
  f_0x94 = field(F32);
  f_0x98 = field(ID);
  f_0xa8 = field(F32);
  f_0x68 = field(ID);
  f_0xa0 = field(ID);
  f_2 = field(U32, { condition: (ctx) => ctx.lt((ctx) => ctx.version(), 4) });
  f_0xdc = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x7c = field(ID, { condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2) });
  f_0x84 = field(ID, { condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2) });
  f_0x8c = field(ID, { condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2) });
}
