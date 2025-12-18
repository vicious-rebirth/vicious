import { Class, field } from "../core";
import { AssetReference } from "./asset";
import { U32 } from "./atomic";
import { Base } from "./base";
import { V421 } from "./v421";

export class V305 extends Class {
  __id = 305;
  __offset = 0x2c7c0;

  base = field(Base);
  v421 = field(V421, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  old = field(AssetReference, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 2),
  });
  old2 = field(U32, { condition: (ctx) => ctx.lt((ctx) => ctx.version(), 2) });
}
