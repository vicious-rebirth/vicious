import { Class, deprecated, field } from "../core";
import { AssetReferenceSizedList } from "./asset";
import { UIText } from "./uiText";

export class V127 extends Class {
  __id = 127;
  __offset = 0xbb930;

  base = field(UIText);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  f_0xd4 = field(AssetReferenceSizedList);
  __ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 3));
}
