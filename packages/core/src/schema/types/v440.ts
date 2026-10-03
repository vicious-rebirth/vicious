import { Class, field } from "../core";
import { GameStateExpression } from "./gameStateExpression";

export class V440 extends Class {
  __id = 440;
  __todo = true;
  __offset = 0x5d560;

  base = field(GameStateExpression);
}
