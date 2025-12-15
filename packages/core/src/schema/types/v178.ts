import { Class, field } from "../core";

import { Action } from "./action";
import { AssetFromTypeWrap } from "./asset";
import { BOOL, U8, U32 } from "./atomic";
import { ID } from "./id";

export class V178 extends Class {
  __id = 178;

  base = field(Action);
  f_0x0c = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  f_0x10 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  f_0x14 = field(U32);
  f_0x18 = field(U32);
  f_0x1c = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 5),
  });
  f_0x20 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 5),
  });
  f_0x24 = field(ID, { condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2) });
  old = field(U8, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.gt((ctx) => ctx.version(), 1),
        (ctx) => ctx.lt((ctx) => ctx.version(), 4)
      ),
  });
  f_1 = field(U32, { condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3) });
}
