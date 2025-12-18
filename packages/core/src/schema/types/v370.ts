import { Class, field } from "../core";
import { U32 } from "./atomic";
import { V369 } from "./v369";

export class V370 extends Class {
  __id = 370;
  __offset = 0x33850;

  base = field(V369);
  f_1 = field(U32);
}
