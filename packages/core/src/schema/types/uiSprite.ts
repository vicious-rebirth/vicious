import { Class, deprecated, field } from "../core";
import { AssetReferenceSizedList } from "./asset";
import { F32, U8, U32 } from "./atomic";
import { UIElement } from "./uiElement";

export class UISprite extends Class {
  __id = 513;
  __offset = 0xb6520;

  base = field(UIElement);
  spriteFlags = field(U32);
  opacity = field(U8);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 7));
  width = field(F32);
  height = field(F32);
  stateSprites = field(AssetReferenceSizedList);
  __ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 7));
}
