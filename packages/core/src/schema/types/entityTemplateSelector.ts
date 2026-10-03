import { Class, field } from "../core";
import { AssetFromType } from "./asset";
import { FN_0x21dd0, FN_0x22080 } from "./fns";
import { TypedAssetSelector } from "./typedAssetSelector";

export class EntityTemplateSelector extends Class {
  __id = 422;
  __offset = 0x3c950;

  base = field(TypedAssetSelector);
  expression = field(FN_0x22080);
  fallback = field(FN_0x21dd0);
  entity = field(AssetFromType, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
