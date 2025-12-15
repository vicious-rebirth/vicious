import { Class, field } from "../core";

import { AssetFromTypeSizedList } from "./asset";
import { U32 } from "./atomic";
import { Base } from "./base";

export class V435 extends Class {
  __id = 435;
  __offset = 0x50110;

  base = field(Base);
  f_1 = field(U32, { condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2) });
  f_2 = field(U32, { condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2) });
  f_0x04 = field(AssetFromTypeSizedList);
  f_0x0c = field(AssetFromTypeSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
