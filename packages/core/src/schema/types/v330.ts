import { Class, deprecated, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { V108 } from "./v108";

export class V330 extends Class {
  __id = 330;
  __offset = 0x34280;

  base = field(V108);
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 0));
  f_1 = field(U32);
  f_2 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
