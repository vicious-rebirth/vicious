import { ClassCodec, field } from "../core";

import { World } from "./world";

export class Region extends ClassCodec {
  __id = 102;
  __folder = "Regions";
  __ext = "rgn";
  __todo = true;

  base = field(World);
}
