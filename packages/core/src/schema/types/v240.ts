import { ClassCodec, deprecated, field } from "../core";

import { AssetFromTypeWrap } from "./asset";
import { U32, BOOL } from "./atomic";
import { Label } from "./label";
import { V108 } from "./v108";
import { V301 } from "./v301";
import { V333 } from "./v333";

export class V240 extends ClassCodec {
  __id = 240;

  base = field(V108);
  f_0x04 = field(U32);
  f_0x08 = field(V301);
  f_0x34 = field(V301);
  f_0x74 = field(Label, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x8c = field(Label, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0xa4 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 5),
  });
  f_0xac = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0xb4 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0xb8 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 4));
  f_0xa8 = field(U32, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 4),
  });
  f_0x60 = field(V333, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 4),
  });
  f_0xc4 = field(U32, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 4),
  });
  f_0xbc = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  f_0xc5 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 6),
  });
  f_0xc6 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 6),
  });
  f_0xb0 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 7),
  });
  f_0xc0 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 7),
  });
}
