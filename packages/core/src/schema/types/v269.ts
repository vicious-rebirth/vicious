import { Class, field } from "../core";
import { U8 } from "./atomic";
import { V260 } from "./v260";

export class V269 extends Class {
  __id = 269;
  __offset = 0x50ee0;

  base = field(V260);
  f_0x10 = field(U8);
}
