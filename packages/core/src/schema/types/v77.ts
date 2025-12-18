import { Class, field } from "../core";
import { F32 } from "./atomic";
import { StaticLight } from "./staticLight";

export class V77 extends Class {
  __id = 77;
  __offset = 0x113db0;

  base = field(StaticLight);
  f_0x7c = field(F32);
  f_0x80 = field(F32);
}
