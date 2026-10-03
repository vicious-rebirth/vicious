import { Class, field } from "../core";
import { DynamicGeom } from "./dynamicGeom";

export class ParticleSystem extends Class {
  __id = 48;
  __todo = true;
  __offset = 0x1d6a0;

  base = field(DynamicGeom);
}
