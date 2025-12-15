import { Class, field } from "../core";

import { AssetFromTypeWrap } from "./asset";
import { U32, BOOL } from "./atomic";
import { Label } from "./label";
import { V108 } from "./v108";
import { V301 } from "./v301";
import { V333 } from "./v333";

export class V229 extends Class {
  __id = 229;

  base = field(V108);
  f_0x04 = field(V301);
  f_0x30 = field(V301);
  f_0x5c = field(V333, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  f_0xa0 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  f_0x70 = field(Label, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x88 = field(Label, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0xa8 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0xa4 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0xa9 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 5),
  });
  f_0xac = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 6),
  });
  f_0xb0 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 6),
  });
}
