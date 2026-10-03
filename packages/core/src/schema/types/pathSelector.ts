import { Class, field } from "../core";
import { FN_0x224c0, FN_0x22080 } from "./fns";
import { TypedAssetSelector } from "./typedAssetSelector";

export class PathSelector extends Class {
  __id = 319;
  __offset = 0x3d150;

  base = field(TypedAssetSelector);
  expression = field(FN_0x22080);
  fallback = field(FN_0x224c0);
}
