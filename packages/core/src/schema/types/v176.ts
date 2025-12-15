import { Class, deprecated, field } from "../core";

import {
  AssetFromType,
  AssetFromTypeSizedList,
  AssetReference,
  AssetReferenceSizedList,
} from "./asset";
import { U32 } from "./atomic";
import { Base } from "./base";

export class V176 extends Class {
  __id = 176;

  base = field(Base);
  f_0x04 = field(AssetReference);
  f_0x08 = field(AssetReferenceSizedList);
  f_0x10 = field(U32);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 3));
  f_0x0c = field(AssetFromType, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 3),
  });
  f_0x14 = field(AssetFromTypeSizedList, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 1),
  });
}
