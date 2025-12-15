import { ClassCodec, field } from "../core";

import { AssetFromTypeSizedList } from "./asset";
import { U16 } from "./atomic";
import { V260 } from "./v260";

export class V262 extends ClassCodec {
  __id = 262;

  base = field(V260);
  f_0x10 = field(AssetFromTypeSizedList);
  f_0x18 = field(U16, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x1c = field(AssetFromTypeSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}
