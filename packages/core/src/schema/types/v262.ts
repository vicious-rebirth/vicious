import { Class, field } from "../core";
import { AssetFromTypeSizedList } from "./asset";
import { U16 } from "./atomic";
import { V260 } from "./v260";

export class V262 extends Class {
  __id = 262;
  __offset = 0x51cd0;

  base = field(V260);
  f_0x10 = field(AssetFromTypeSizedList);
  f_0x18 = field(U16, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x1c = field(AssetFromTypeSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}
