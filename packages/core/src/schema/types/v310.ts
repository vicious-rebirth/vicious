import { Class, field } from "../core";
import { AssetReference, AssetReferenceSuffixSizedList } from "./asset";
import { U32 } from "./atomic";
import { EntityTemplateSelector } from "./entityTemplateSelector";
import { ExpressionList } from "./expression";
import { Statement } from "./statement";

export class V310 extends Class {
  __id = 310;
  __offset = 0x7c4c0;

  base = field(Statement);
  f_0x08 = field(U32);
  old = field(AssetReference, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 3),
  });
  f_0x0c = field(EntityTemplateSelector, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 3),
  });
  f_0x24 = field(ExpressionList);
  f_0x2c = field(AssetReferenceSuffixSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
