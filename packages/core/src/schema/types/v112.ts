import { Class, field } from "../core";
import { AssetFromTypeList } from "./asset";
import { U32 } from "./atomic";
import { V108 } from "./v108";

export class V112 extends Class {
  __id = 112;
  __offset = 0x34e80;

  base = field(V108);
  f_0x04 = field(U32);
  f_0x08 = field(U32);
  f_0x0c = field(AssetFromTypeList, {
    offset: 0x34eda,
    custom: (ctx) => {
      ctx.set(this.f_0x0c.consume, false);
      ctx.set(this.f_0x0c.count, 3);
      ctx.walk(this.f_0x0c);
    },
  });
}
