import { Class, field } from "../core";
import { AssetFromTypeWrap, AssetReference } from "./asset";
import { U32 } from "./atomic";
import { CustomAnimationSelector } from "./customAnimationSelector";
import { EntitySelector } from "./entitySelector";
import { FN_0x21f40 } from "./fns";
import { Statement } from "./statement";

export class V193 extends Class {
  __id = 193;
  __offset = 0x42c10;

  base = field(Statement);
  f_0x08 = field(EntitySelector);
  f_0x38 = field(FN_0x21f40, {
    custom: (ctx) => {
      ctx.set(this.f_0x38.version, (ctx) => ctx.version());
      ctx.set(this.f_0x38.targetVersion, 2);
      ctx.walk(this.f_0x38);
    },
  });
  f_0x34 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x50_1 = field(CustomAnimationSelector, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 5),
  });
  f_0x50_2 = field(AssetReference, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 5),
  });
  f_0x64 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
}
