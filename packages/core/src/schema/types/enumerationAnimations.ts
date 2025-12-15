import { Class, field } from "../core";

import { AssetFromTypeSizedList } from "./asset";
import { V173 } from "./v173";

export class EnumerationAnimations extends Class {
  __id = 177;

  base = field(V173);
  animations = field(AssetFromTypeSizedList);
}
