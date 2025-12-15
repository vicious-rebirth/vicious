import { ClassCodec, deprecated, field } from "../core";

import { AssetFromTypeWrap, AssetReference } from "./asset";
import { U32 } from "./atomic";
import { Base } from "./base";

export class V421 extends ClassCodec {
  __id = 421;

  base = field(Base);
  f_0x04 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x08 = field(AssetReference, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x0c = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x10 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  _ = deprecated((ctx) => ctx.lte((ctx) => ctx.version(), 2));
}
