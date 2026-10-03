import { Class, field } from "../core";
import { F32 } from "./atomic";
import { StaticLight } from "./staticLight";

export class SpotStaticLight extends Class {
  __id = 76;
  __offset = 0x113a40;

  base = field(StaticLight);
  coneAngle = field(F32);
}
