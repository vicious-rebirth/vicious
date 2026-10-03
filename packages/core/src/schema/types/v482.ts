import { Class, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { EntitySelector } from "./entitySelector";
import { GameStateExpression } from "./gameStateExpression";

export class V482 extends Class {
  __id = 482;
  __offset = 0x5a0d0;

  base = field(GameStateExpression);
  v301 = field(EntitySelector);
  f_0x30 = field(AssetFromTypeWrap);
}
