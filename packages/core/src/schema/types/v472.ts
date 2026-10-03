import { Class, field } from "../core";
import { AssetReference } from "./asset";
import { U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { Label } from "./label";
import { PointSelector } from "./pointSelector";
import { Statement } from "./statement";

export class V472 extends Class {
  __id = 472;
  __offset = 0x44480;

  base = field(Statement);
  f_0x00 = field(EntitySelector);
  f_0x34 = field(U32);
  f_0x38 = field(U32);
  f_0x3c_1 = field(PointSelector, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 3),
  });
  f_0x3c_2 = field(AssetReference, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 3),
  });
  f_0x50 = field(EntitySelector);
  f_0x7c = field(Label);
}
