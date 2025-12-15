import { Class, deprecated, field } from "../core";

import { Action } from "./action";
import {
  AssetFromType,
  AssetFromTypeSizedList,
  AssetFromTypeWrap,
  AssetReference,
} from "./asset";
import { U32, BOOL } from "./atomic";

export class V194 extends Class {
  __id = 194;

  base = field(Action);
  f_0x08 = field(AssetReference);
  f_0x0c = field(U32);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  __ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 4));
  f_0x10 = field(AssetFromTypeWrap);
  f_0x14 = field(AssetFromTypeSizedList);
  f_0x1c = field(AssetFromType);
  f_0x20 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}
