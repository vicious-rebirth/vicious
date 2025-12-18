import { Class, field } from "../core";
import { AssetFromType, AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { V108 } from "./v108";

export class V438 extends Class {
  __id = 438;
  __offset = 0x34bb0;

  base = field(V108);
  f_1 = field(U32);
  f_2 = field(AssetFromTypeWrap);
  f_3 = field(AssetFromType, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
