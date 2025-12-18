import { Class, field } from "../core";
import { Action } from "./action";
import { AssetReference, AssetReferenceSuffixSizedList } from "./asset";
import { U32 } from "./atomic";
import { V301 } from "./v301";
import { V422 } from "./v422";

export class V343 extends Class {
  __id = 343;
  __offset = 0x7c0b0;

  base = field(Action);
  f_0x0c = field(V301);
  f_0x08 = field(U32);
  f_0x38 = field(U32);
  f_0x3c = field(U32);
  f_0x40 = field(U32);
  old = field(AssetReference, {
    condition: (ctx) => ctx.eq((ctx) => ctx.version(), 1),
  });
  f_0x44 = field(V422, {
    condition: (ctx) => ctx.neq((ctx) => ctx.version(), 1),
  });
  f_0x5c = field(AssetReferenceSuffixSizedList);
}
