import { Class, field } from "../core";
import { StaticGeomTemplate } from "./staticGeomTemplate";

export class HeightmapTemplate extends Class {
  __id = 84;
  __todo = true;
  __offset = 0x117a60;

  base = field(StaticGeomTemplate);
}
