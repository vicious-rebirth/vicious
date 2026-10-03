import { Class, deprecated, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { ValueExpression } from "./valueExpression";

export class MultiplayerStatusExpression extends Class {
  __id = 330;
  __offset = 0x34280;

  base = field(ValueExpression);
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 0));
  property = field(U32);
  f_2 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
