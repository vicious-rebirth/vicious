import { Class, field } from "../core";

import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { V109 } from "./v109";
import { V421 } from "./v421";

export class V436 extends Class {
  __id = 436;

  base = field(V109);
  f_0x04 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x08 = field(U32);
  f_0x0c = field(V421);
  f_0x24 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
