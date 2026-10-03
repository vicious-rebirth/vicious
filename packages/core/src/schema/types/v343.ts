import { Class, field } from "../core";
import { AssetReference, AssetReferenceSuffixSizedList } from "./asset";
import { U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { EntityTemplateSelector } from "./entityTemplateSelector";
import { Statement } from "./statement";

export class V343 extends Class {
  __id = 343;
  __offset = 0x7c0b0;

  base = field(Statement);
  f_0x0c = field(EntitySelector);
  f_0x08 = field(U32);
  f_0x38 = field(U32);
  f_0x3c = field(U32);
  f_0x40 = field(U32);
  old = field(AssetReference, {
    condition: (ctx) => ctx.eq((ctx) => ctx.version(), 1),
  });
  f_0x44 = field(EntityTemplateSelector, {
    condition: (ctx) => ctx.neq((ctx) => ctx.version(), 1),
  });
  f_0x5c = field(AssetReferenceSuffixSizedList);
}
