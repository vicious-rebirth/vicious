import { ClassCodec, field } from "../core";

import { AssetFromTypeSizedList } from "./asset";
import { V173 } from "./v173";

export class EnumerationAnimations extends ClassCodec {
  __id = 177;

  base = field(V173);
  animations = field(AssetFromTypeSizedList);
}
