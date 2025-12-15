import { Class, field } from "../core";

import { World } from "./world";

export class Region extends Class {
  __id = 102;
  __folder = "Regions";
  __ext = "rgn";
  __todo = true;

  base = field(World);
}
