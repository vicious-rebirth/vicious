import { Class, field } from "../core";
import { AssetReference } from "./asset";
import { F32 } from "./atomic";
import { StaticLight } from "./staticLight";

export class V79 extends Class {
  __id = 79;
  __offset = 0x113cf0;

  base = field(StaticLight);
  f_0x7c = field(F32);
  f_0x80 = field(F32);
  f_0x84 = field(AssetReference, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
