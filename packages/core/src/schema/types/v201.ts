import { Class, deprecated, field } from "../core";
import { Action } from "./action";
import { AssetFromType, AssetFromTypeSizedList, AssetReference } from "./asset";
import { U32 } from "./atomic";

export class V201 extends Class {
  __id = 201;
  __offset = 0x24ab0;

  base = field(Action);
  f_0x08 = field(AssetReference);
  f_0x0c = field(U32);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  f_0x10 = field(AssetFromTypeSizedList, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x18 = field(AssetFromType, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
}
