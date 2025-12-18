import { Class, field } from "../core";
import { Action } from "./action";
import { AssetFromTypeList } from "./asset";
import { ExpressionList } from "./expression";

export class V215 extends Class {
  __id = 215;
  __offset = 0x4a430;

  base = field(Action);
  f_0x10 = field(ExpressionList);
  f_2 = field(AssetFromTypeList, {
    offset: 0x4a470,
    custom: (ctx) => {
      ctx.set(this.f_2.consume, false);
      ctx.set(this.f_2.count, 3);
      ctx.walk(this.f_2);
    },
  });
}
