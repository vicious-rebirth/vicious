import { Class, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { Statement } from "./statement";

export class V195 extends Class {
  __id = 195;
  __offset = 0x3f8e0;

  base = field(Statement);
  f_0x08 = field(EntitySelector);
  f_0x34 = field(U32);
  f_0x3c = field(U32);
  f_0x40 = field(AssetFromTypeWrap);
  f_0x38 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}
