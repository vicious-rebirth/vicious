import { Class, field } from "../core";
import { DynamicGeom } from "./dynamicGeom";

export class MaterialVolume extends Class {
  __id = 90;
  __todo = true;
  __offset = 0x1d6a0;

  base = field(DynamicGeom);
}
