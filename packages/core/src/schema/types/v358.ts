import { Class, field } from "../core";
import { AssetReference } from "./asset";
import { GameStateExpression } from "./gameStateExpression";

export class V358 extends Class {
  __id = 358;
  __offset = 0x33140;

  base = field(GameStateExpression);
  f_1 = field(AssetReference);
}
