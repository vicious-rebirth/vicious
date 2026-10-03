import { Class, field } from "../core";
import { AssetFromTypeList } from "./asset";
import { ExpressionList } from "./expression";
import { Statement } from "./statement";

export class CaseStatement extends Class {
  __id = 215;
  __offset = 0x4a430;

  base = field(Statement);
  body = field(ExpressionList);
  matchValues = field(AssetFromTypeList, {
    offset: 0x4a470,
    custom: (ctx) => {
      ctx.set(this.matchValues.consume, false);
      ctx.set(this.matchValues.count, 3);
      ctx.walk(this.matchValues);
    },
  });
}
