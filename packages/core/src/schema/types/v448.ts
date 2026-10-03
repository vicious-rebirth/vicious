import { Class, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { Label } from "./label";
import { PointSelector } from "./pointSelector";
import { Statement } from "./statement";

export class V448 extends Class {
  __id = 448;
  __offset = 0x46f90;

  base = field(Statement);
  f_0x0c = field(EntitySelector);
  f_0x38 = field(AssetFromTypeWrap);
  f_0x68 = field(PointSelector, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x3c = field(EntitySelector, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x7c = field(Label, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x04 = field(U32);
  f_0x94 = field(AssetFromTypeWrap);
  f_0x98 = field(AssetFromTypeWrap);
}
