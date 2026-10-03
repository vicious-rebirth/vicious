import { Class, field } from "../core";
import { FN_0x22080, FN_0x22520 } from "./fns";
import { TypedAssetSelector } from "./typedAssetSelector";

export class UIElementSelector extends Class {
  __id = 489;
  __offset = 0x3d890;

  base = field(TypedAssetSelector);
  expression = field(FN_0x22080);
  target = field(FN_0x22520);
}
