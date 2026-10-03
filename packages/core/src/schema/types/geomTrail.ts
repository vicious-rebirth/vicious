import { Class, field } from "../core";
import { DynamicGeom } from "./dynamicGeom";

export class GeomTrail extends Class {
  __id = 52;
  __todo = true;
  __offset = 0x1d6a0;

  base = field(DynamicGeom);
}
