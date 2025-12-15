import { ClassCodec, field } from "../core";

import { U32 } from "./atomic";
import { Group } from "./group";
import { Transform } from "./math";
import { Object } from "./object";

export class PointGroup extends ClassCodec {
  __id = 68;

  base = field(Group);
}

export class Point extends ClassCodec {
  __id = 67;
  __folder = "Points";
  __ext = "pnt";

  base = field(Object);
  transform = field(Transform);
  f_0x70 = field(U32);
}
