import { Class, field } from "../core";
import { U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { GameStateExpression } from "./gameStateExpression";

export class V216 extends Class {
  __id = 216;
  __offset = 0x5d560;

  base = field(GameStateExpression);
  f_1 = field(EntitySelector);
  f_2 = field(U32);
}
