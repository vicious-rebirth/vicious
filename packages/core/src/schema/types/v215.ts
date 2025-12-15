import { ClassCodec, field } from "../core";

import { Action } from "./action";
import { AssetFromTypeList } from "./asset";
import { ExpressionList } from "./expression";

export class V215 extends ClassCodec {
  __id = 215;

  base = field(Action);
  f_0x10 = field(ExpressionList);
  f_2 = field(AssetFromTypeList, {
    custom: (ctx) => {
      ctx.set(this.f_2.count, 3);
      ctx.walk(this.f_2);
    },
  });
}
