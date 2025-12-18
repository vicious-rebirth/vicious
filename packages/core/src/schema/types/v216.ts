import { Class, field } from "../core";
import { U32 } from "./atomic";
import { V109 } from "./v109";
import { V301 } from "./v301";

export class V216 extends Class {
  __id = 216;
  __offset = 0x5d560;

  base = field(V109);
  f_1 = field(V301);
  f_2 = field(U32);
}
