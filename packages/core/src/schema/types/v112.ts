import { ClassCodec, field } from "../core";

import { AssetFromTypeList } from "./asset";
import { U32 } from "./atomic";
import { V108 } from "./v108";

export class V112 extends ClassCodec {
  __id = 112;

  base = field(V108);
  f_0x04 = field(U32);
  f_0x08 = field(U32);
  f_0x0c = field(AssetFromTypeList, {
    custom: (ctx) => {
      ctx.set(this.f_0x0c.count, 3);
      ctx.walk(this.f_0x0c);
    },
  });
}
