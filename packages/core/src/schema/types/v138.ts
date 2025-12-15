import { Class, deprecated, field } from "../core";

import { Action } from "./action";
import { AssetFromType, AssetFromTypeWrap, AssetReference } from "./asset";
import { U32, U8 } from "./atomic";
import { ID } from "./id";
import { V166 } from "./v166";
import { V365 } from "./v365";

export class V138 extends Class {
  __id = 138;
  __offset = 0x4c8e0;

  base = field(Action);
  f_0x08 = field(V166);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  __ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 2));
  f_0x40 = field(V365, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  ___ = field(U8, {
    deprecated: (ctx) =>
      ctx.and(
        (ctx) => ctx.gt((ctx) => ctx.version(), 3),
        (ctx) => ctx.lt((ctx) => ctx.version(), 8)
      ),
  });
  f_0x54 = field(U32);
  f_0x58 = field(U32);
  f_0x5c = field(AssetFromTypeWrap);
  f_0x60 = field(AssetReference);
  f_0x64 = field(ID);
  f_0x6c = field(ID);
  f_0x74 = field(AssetFromTypeWrap);
  f_0x78 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 6),
  });
  f_0x7c = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 8),
  });
  ____ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 6));
  f_0x84 = field(AssetFromType, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 6),
  });
  f_0x88 = field(AssetFromType, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 6),
  });
  f_0x80 = field(AssetFromType, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  _____ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 8));
}
