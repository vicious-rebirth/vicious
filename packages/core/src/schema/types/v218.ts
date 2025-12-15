import { ClassCodec, field } from "../core";

import { AssetReferenceSuffixSizedList } from "./asset";
import { V217 } from "./v217";

export class V218 extends ClassCodec {
  __id = 218;

  base = field(V217);
  f_0x2c = field(AssetReferenceSuffixSizedList);
  f_0x30 = field(AssetReferenceSuffixSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
