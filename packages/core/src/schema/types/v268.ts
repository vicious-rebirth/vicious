import { Class, field } from "../core";
import { AssetReference } from "./asset";
import { U32 } from "./atomic";
import { CustomAnimationSelector } from "./customAnimationSelector";
import { EntitySelector } from "./entitySelector";
import { FN_0x21f40 } from "./fns";
import { Statement } from "./statement";

export class V268 extends Class {
  __id = 268;
  __offset = 0x42f60;

  base = field(Statement);
  f_0x08 = field(EntitySelector);
  f_0x34 = field(FN_0x21f40, {
    custom: (ctx) => {
      ctx.set(this.f_0x34.version, (ctx) => ctx.version());
      ctx.set(this.f_0x34.targetVersion, 2);
      ctx.walk(this.f_0x34);
    },
  });
  f_0x50 = field(FN_0x21f40, {
    custom: (ctx) => {
      ctx.set(this.f_0x50.version, (ctx) => ctx.version());
      ctx.set(this.f_0x50.targetVersion, 2);
      ctx.walk(this.f_0x50);
    },
  });
  f_0x4c = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x68_1 = field(CustomAnimationSelector, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 4),
  });
  f_0x68_2 = field(AssetReference, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.gt((ctx) => ctx.version(), 2),
        (ctx) => ctx.lt((ctx) => ctx.version(), 4)
      ),
  });
}
