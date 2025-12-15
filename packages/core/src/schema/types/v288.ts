import { Class, field } from "../core";

import { U32 } from "./atomic";
import { Vector3 } from "./math";
import { V309 } from "./v309";

export class V288 extends Class {
  __id = 288;
  __offset = 0x104050;

  base = field(V309);
  f_0x4c = field(Vector3);
  f_0x58 = field(U32);
}
