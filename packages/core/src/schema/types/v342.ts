import { ClassCodec, deprecated, field } from "../core";

import { Action } from "./action";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { Label } from "./label";
import { V301 } from "./v301";

export class V342 extends ClassCodec {
  __id = 342;

  base = field(Action);
  f_0x08 = field(U32);
  f_0x0c = field(V301);
  f_0x38 = field(V301);
  f_0x64 = field(Label);
  f_0x7c = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  f_0x80 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 4));
}
