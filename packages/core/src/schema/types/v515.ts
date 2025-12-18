import { Class, field } from "../core";
import { U32 } from "./atomic";
import { V391 } from "./v391";

export class V515 extends Class {
  __id = 515;
  __offset = 0x507c0;

  base = field(V391);
  f_1 = field(U32);
}
