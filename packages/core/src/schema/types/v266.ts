import { Class, field } from "../core";
import { U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { FN_0x21f40 } from "./fns";
import { Statement } from "./statement";

export class V266 extends Class {
  __id = 266;
  __offset = 0x3fd50;

  base = field(Statement);
  f_0x08 = field(EntitySelector);
  f_0x34 = field(U32);
  f_0x38 = field(FN_0x21f40, {
    custom: (ctx) => {
      ctx.set(this.f_0x38.version, (ctx) => ctx.version());
      ctx.set(this.f_0x38.targetVersion, 2);
      ctx.walk(this.f_0x38);
    },
  });
}
