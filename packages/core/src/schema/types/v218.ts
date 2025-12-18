import { Class, field } from "../core";
import { AssetReferenceSuffixSizedList } from "./asset";
import { V217 } from "./v217";

export class V218 extends Class {
  __id = 218;
  __offset = 0x83020;

  base = field(V217);
  f_0x2c = field(AssetReferenceSuffixSizedList);
  f_0x30 = field(AssetReferenceSuffixSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
