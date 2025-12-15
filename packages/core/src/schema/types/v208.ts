import { ClassCodec, field } from "../core";

import { AssetFromType } from "./asset";
import { V108 } from "./v108";

export class V208 extends ClassCodec {
  __id = 208;

  base = field(V108);
  f_1 = field((ctx) => ctx.array(AssetFromType, 2));
}
