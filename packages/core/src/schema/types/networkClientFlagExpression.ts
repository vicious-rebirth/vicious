import { Class, deprecated, field } from "../core";
import { U32 } from "./atomic";
import { GameStateExpression } from "./gameStateExpression";

export class NetworkClientFlagExpression extends Class {
  __id = 484;
  __offset = 0x33b90;

  base = field(GameStateExpression);
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 0));
  property = field(U32);
}
