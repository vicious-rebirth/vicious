import { Class, field } from "../core";
import { U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { GameStateExpression } from "./gameStateExpression";

export class EntityMotionPropertyExpression extends Class {
  __id = 203;
  __offset = 0x57fd0;

  base = field(GameStateExpression);
  entity = field(EntitySelector);
  property = field(U32);
}
