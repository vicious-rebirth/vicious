import { Class, deprecated, field } from "../core";

import { AssetFromType } from "./asset";
import { FN_0x21f40 } from "./fns";
import { V108 } from "./v108";

export class V307 extends Class {
  __id = 307;

  base = field(V108);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  f_0x04 = field(AssetFromType, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_1 = field(FN_0x21f40, {
    custom: (ctx) => {
      ctx.set(this.f_1.version, (ctx) => ctx.version());
      ctx.set(this.f_1.targetVersion, 3);
      ctx.walk();
    },
  });
}
