import { Class, field } from "../core";
import { F32 } from "./atomic";
import { V108 } from "./v108";

export class V480 extends Class {
  __id = 480;
  __offset = 0x33850;

  base = field(V108);
  f_0x04 = field(F32);
}
