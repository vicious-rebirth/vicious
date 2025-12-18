import { Class, deprecated, field } from "../core";
import { Script } from "./script";
import { Surface } from "./surface";

export class V126 extends Class {
  __id = 126;
  __offset = 0x54bc0;

  base = field(Surface);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  onTouched = field(Script);
}
