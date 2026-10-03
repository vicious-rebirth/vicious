import { Class, field } from "../core";
import { AssetFromTypeList } from "./asset";
import { U32 } from "./atomic";
import { ValueExpression } from "./valueExpression";

export class TernaryOperationExpression extends Class {
  __id = 112;
  __offset = 0x34e80;

  base = field(ValueExpression);
  exclusiveBounds = field(U32);
  operation = field(U32);
  operands = field(AssetFromTypeList, {
    offset: 0x34eda,
    custom: (ctx) => {
      ctx.set(this.operands.consume, false);
      ctx.set(this.operands.count, 3);
      ctx.walk(this.operands);
    },
  });
}
