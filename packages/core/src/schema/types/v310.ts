import { Class, field } from "../core";
import { Action } from "./action";
import { AssetReference, AssetReferenceSuffixSizedList } from "./asset";
import { U32 } from "./atomic";
import { ExpressionList } from "./expression";
import { V422 } from "./v422";

export class V310 extends Class {
  __id = 310;
  __offset = 0x7c4c0;

  base = field(Action);
  f_0x08 = field(U32);
  old = field(AssetReference, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 3),
  });
  f_0x0c = field(V422, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 3),
  });
  f_0x24 = field(ExpressionList);
  f_0x2c = field(AssetReferenceSuffixSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
