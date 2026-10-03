import { Class, field } from "../core";
import { Geom } from "./geom";

export class StaticGeom extends Class {
  __id = 26;
  __offset = 0x298c0;

  base = field(Geom);
}
