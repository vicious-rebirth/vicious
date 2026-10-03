import { Class, deprecated, field } from "../core";
import { FN_0x224c0, FN_0x22080 } from "./fns";
import { TypedAssetSelector } from "./typedAssetSelector";

export class CustomAnimationSelector extends Class {
  __id = 511;
  __offset = 0x3d730;

  base = field(TypedAssetSelector);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  expression = field(FN_0x22080);
  fallback = field(FN_0x224c0);
}
