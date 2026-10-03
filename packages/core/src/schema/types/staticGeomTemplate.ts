import { Class, field } from "../core";
import { GeomTemplate } from "./geomTemplate";

export class StaticGeomTemplate extends Class {
  __id = 33;
  __offset = 0xd9700;

  base = field(GeomTemplate);
}
