import { Class, field } from "../core";
import { FN_0x21dd0, FN_0x22080 } from "./fns";
import { TypedAssetSelector } from "./typedAssetSelector";

export class SpriteSelector extends Class {
  __id = 366;
  __offset = 0x3d2f0;

  base = field(TypedAssetSelector);
  expression = field(FN_0x22080);
  fallback = field(FN_0x21dd0);
}
