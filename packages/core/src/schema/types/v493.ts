import { ClassCodec, field } from "../core";

import { AssetReferenceSuffixSizedList } from "./asset";
import { V173 } from "./v173";

export class V493 extends ClassCodec {
  __id = 493;

  base = field(V173);
  f_1 = field(AssetReferenceSuffixSizedList);
}
