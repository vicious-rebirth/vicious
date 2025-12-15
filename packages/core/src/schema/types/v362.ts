import { Class, field } from "../core";

import { Action } from "./action";
import { AssetFromType, AssetFromTypeSizedList, AssetReference } from "./asset";
import { U32 } from "./atomic";

export class V362 extends Class {
  __id = 362;
  __offset = 0x239c0;

  base = field(Action);
  f_1 = field(U32);
  f_2 = field(AssetReference);
  f_0x10 = field(U32);
  f_0x14 = field(U32);
  f_0x18 = field(AssetFromType);
  f_0x1c = field(AssetFromTypeSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
