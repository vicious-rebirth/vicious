import { Class, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { Label } from "./label";
import { V108 } from "./v108";
import { V166 } from "./v166";
import { V301 } from "./v301";

export class V364 extends Class {
  __id = 364;
  __offset = 0x59c70;

  base = field(V108);
  v301 = field(V301);
  label = field(Label, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  v166 = field(V166);
  f_0x80 = field(U32);
  f_0x84 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x88 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x8c = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x90 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
}
