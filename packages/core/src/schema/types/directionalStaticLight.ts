import { Class, field } from "../core";
import { AssetReference } from "./asset";
import { F32 } from "./atomic";
import { StaticLight } from "./staticLight";

export class DirectionalStaticLight extends Class {
  __id = 79;
  __offset = 0x113cf0;

  base = field(StaticLight);
  azimuth = field(F32);
  elevation = field(F32);
  f_0x84 = field(AssetReference, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
