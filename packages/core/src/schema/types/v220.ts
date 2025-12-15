import { Class, deprecated, field } from "../core";

import { Action } from "./action";
import { AssetFromTypeWrap } from "./asset";
import { U32, BOOL } from "./atomic";
import { Label } from "./label";
import { V301 } from "./v301";
import { V333 } from "./v333";

export class V220 extends Class {
  __id = 220;

  base = field(Action);
  f_0x08 = field(V301);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  f_0x34 = field(V333, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x48 = field(V301, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x74 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x78 = field(U32, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x7c = field(U32, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x80 = field(Label, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x98 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0xa0 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}
