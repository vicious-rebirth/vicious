import { Class, field } from "../core";

import { AssetReference } from "./asset";
import { U32, BOOL } from "./atomic";
import { Base } from "./base";
import { ID } from "./id";

export class V446 extends Class {
  __id = 446;
  __offset = 0x2f250;

  base = field(Base);
  f_1 = field(U32);
  f_2 = field(U32);
  f_0x14 = field(AssetReference);
  f_0x18 = field(BOOL, {
    custom: (ctx) => {
      ctx.if(
        (ctx) => ctx.lt((ctx) => ctx.version(), 3),
        (ctx) => {
          const tmp = ctx.var(U32, 0);
          ctx.walk(tmp);
          ctx.set(this.f_0x18, (ctx) => ctx.neq(tmp, 0));
        },
        (ctx) => ctx.walk()
      );
    },
  });
  f_0xc = field(ID, { condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1) });
  f_0x19 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
