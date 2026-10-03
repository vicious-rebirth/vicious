import { Class, field } from "../core";
import { Geom } from "./geom";

export class DynamicGeom extends Class {
  __id = 23;
  __offset = 0x298c0;

  base = field(Geom);
}
