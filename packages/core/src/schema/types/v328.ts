import { Class, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { FN_0x21f40 } from "./fns";
import { Statement } from "./statement";

export class V328 extends Class {
  __id = 328;
  __offset = 0x40ed0;

  base = field(Statement);
  f_0x08 = field(EntitySelector);
  f_0x4c = field(AssetFromTypeWrap);
  f_0x34 = field(FN_0x21f40, {
    custom: (ctx) => {
      ctx.set(this.f_0x34.version, (ctx) => ctx.version());
      ctx.set(this.f_0x34.targetVersion, 2);
      ctx.walk();
    },
  });
  f_0x50 = field(U32);
}
