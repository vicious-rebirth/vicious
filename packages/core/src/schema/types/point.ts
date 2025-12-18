import { Class, field } from "../core";
import { U32 } from "./atomic";
import { Group } from "./group";
import { Transform } from "./math";
import { Object } from "./object";

export class PointGroup extends Class {
  __id = 68;
  __offset = 0x1a330;

  base = field(Group);
}

export class Point extends Class {
  __id = 67;
  __folder = "Points";
  __ext = "pnt";
  __offset = 0x112450;

  base = field(Object);
  transform = field(Transform);
  f_0x70 = field(U32);
}
