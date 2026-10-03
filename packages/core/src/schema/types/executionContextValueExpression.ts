import { Class, field } from "../core";
import { U32 } from "./atomic";
import { GameStateExpression } from "./gameStateExpression";

export class ExecutionContextValueExpression extends Class {
  __id = 159;
  __offset = 0x5a7d0;

  base = field(GameStateExpression);
  source = field(U32);
  index = field(U32);
}
