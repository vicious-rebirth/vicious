import { Class, deprecated, field } from "../core";
import { AssetFromType } from "./asset";
import { U32 } from "./atomic";
import { UIGrid } from "./uiGrid";

export class UISelectionGrid extends Class {
  __id = 134;
  __offset = 0x99aa0;

  base = field(UIGrid);
  f_0xa4 = field(U32);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 3));
  f_0x98 = field(AssetFromType);
}
