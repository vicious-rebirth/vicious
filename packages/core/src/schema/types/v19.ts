import { Class, field } from "../core";
import { U32 } from "./atomic";
import { Color } from "./math";
import { V18 } from "./v18";

export class V19 extends Class {
  __id = 19;
  __offset = 0x111de0;

  base = field(V18);
  tint = field(Color);
  f_0x64 = field(U32);
}
