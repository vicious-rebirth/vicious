import { Class, field } from "../core";
import { StaticGeom } from "./staticGeom";

export class Heightmap extends Class {
  __id = 85;
  __todo = true;
  __offset = 0x117900;

  base = field(StaticGeom);
}
