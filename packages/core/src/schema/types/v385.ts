import { Class, deprecated, field } from "../core";
import { AssetFromType, AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { Statement } from "./statement";

export class V385 extends Class {
  __id = 385;
  __offset = 0x233d0;

  base = field(Statement);
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 4));
  f_0x08 = field(U32);
  f_0x0c = field(AssetFromTypeWrap);
  f_0x10 = field(AssetFromTypeWrap);
  f_0x14 = field(AssetFromType);
}
