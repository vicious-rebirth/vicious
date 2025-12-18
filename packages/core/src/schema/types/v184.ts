import { Class, field } from "../core";
import { AssetReference } from "./asset";
import { V154 } from "./v154";

export class V184 extends Class {
  __id = 184;
  __offset = 0x3c5a0;

  base = field(V154);
  f_0x10 = field(AssetReference, {
    condition: (ctx) => ctx.eq((ctx) => ctx.version(), 1),
  });
}
