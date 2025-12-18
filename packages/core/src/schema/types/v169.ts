import { Class, field } from "../core";
import { Action } from "./action";
import { AssetFromTypeWrap, AssetReference } from "./asset";
import { U32 } from "./atomic";

export class V169 extends Class {
  __id = 169;
  __offset = 0x24fa0;

  base = field(Action);
  f_0x08 = field(U32);
  f_0x0c = field(U32);
  f_0x10 = field(AssetReference, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x14 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}
