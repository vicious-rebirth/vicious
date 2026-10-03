import { Class, deprecated, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { BOOL } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { Statement } from "./statement";

export class V285 extends Class {
  __id = 285;
  __offset = 0x44c10;

  base = field(Statement);
  f_1 = field(EntitySelector);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 3));
  f_0x34 = field(AssetFromTypeWrap);
  f_0x39 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0x38 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
