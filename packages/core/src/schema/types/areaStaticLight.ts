import { Class, field } from "../core";
import { F32 } from "./atomic";
import { StaticLight } from "./staticLight";

export class AreaStaticLight extends Class {
  __id = 77;
  __offset = 0x113db0;

  base = field(StaticLight);
  width = field(F32);
  height = field(F32);
}
