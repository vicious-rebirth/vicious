import { Class, field } from "../core";
import { U32 } from "./atomic";
import { V343 } from "./v343";

export class V345 extends Class {
  __id = 345;
  __offset = 0x8aaa0;

  base = field(V343);
  f_0x60 = field(U32);
}
