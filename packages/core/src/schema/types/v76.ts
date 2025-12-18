import { Class, field } from "../core";
import { F32 } from "./atomic";
import { StaticLight } from "./staticLight";

export class V76 extends Class {
  __id = 76;
  __offset = 0x113a40;

  base = field(StaticLight);
  f_0x7c = field(F32);
}
