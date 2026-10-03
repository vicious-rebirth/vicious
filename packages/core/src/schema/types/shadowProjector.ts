import { Class, field } from "../core";
import { DynamicGeom } from "./dynamicGeom";

export class ShadowProjector extends Class {
  __id = 86;
  __todo = true;
  __offset = 0x1d6a0;

  base = field(DynamicGeom);
}
