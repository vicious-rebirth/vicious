import { Class, field } from "../core";
import { AssetReference } from "./asset";
import { U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { Label } from "./label";
import { Statement } from "./statement";
import { V421 } from "./v421";

export class V283 extends Class {
  __id = 283;
  __offset = 0x44800;

  base = field(Statement);
  v301 = field(EntitySelector);
  v421 = field(V421, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  old = field(AssetReference, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 2),
  });
  old2 = field(U32, { condition: (ctx) => ctx.lt((ctx) => ctx.version(), 2) });
  f_0x4c = field(U32);
  f_0x50 = field(AssetReference);
  v301_2 = field(EntitySelector);
  label = field(Label);
}
