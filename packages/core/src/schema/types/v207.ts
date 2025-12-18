import { Class, field } from "../core";
import { U32 } from "./atomic";
import { V108 } from "./v108";
import { V166 } from "./v166";

export class V207 extends Class {
  __id = 207;
  __offset = 0x579e0;

  base = field(V108);
  v166 = field(V166);
  f_0x3c = field(U32);
}
