import { Class, deprecated, field } from "../core";
import { AssetReferenceSizedList } from "./asset";
import { U32 } from "./atomic";
import { UIText } from "./uiText";

export class UITextInput extends Class {
  __id = 371;
  __offset = 0xbbfa0;

  base = field(UIText);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 3));
  f_0xd0 = field(U32);
  f_0xd8 = field(U32);
  f_0xd4 = field(AssetReferenceSizedList);
  __ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 4));
}
