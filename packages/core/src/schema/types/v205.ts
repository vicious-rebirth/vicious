import { Class, deprecated, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { BOOL, U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { Statement } from "./statement";

export class V205 extends Class {
  __id = 205;
  __offset = 0x44f30;

  base = field(Statement);
  v301 = field(EntitySelector);
  f_0x34 = field(AssetFromTypeWrap);
  f_0x38 = field(U32);
  f_0x3c = field(BOOL);
  f_0x40 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  _ = deprecated((ctx) => ctx.lte((ctx) => ctx.version(), 1));
}
