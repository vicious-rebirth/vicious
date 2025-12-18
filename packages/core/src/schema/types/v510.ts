import { Class, deprecated, field } from "../core";
import { U32 } from "./atomic";
import { V109 } from "./v109";

export class V510 extends Class {
  __id = 510;
  __offset = 0x33b90;

  base = field(V109);
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 0));
  f_1 = field(U32);
}
