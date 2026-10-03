import { Class, field } from "../core";
import { StaticLight } from "./staticLight";

export class PointStaticLight extends Class {
  __id = 75;
  __offset = 0x113940;

  base = field(StaticLight);
}
