import { ClassCodec, deprecated, field } from "../core";

import { AssetFromTypeWrap, AssetReference } from "./asset";
import { U32 } from "./atomic";
import { V368 } from "./v368";

export class V379 extends ClassCodec {
  __id = 379;

  base = field(V368);
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 0));
  f_1 = field(AssetReference);
  f_2 = field(U32);
  f_0x0c = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
