import { Class, field } from "../core";

import { U32 } from "./atomic";
import { Group } from "./group";
import { Object } from "./object";

export class ConstantGroup extends Class {
  __id = 124;

  base = field(Group);
}

export class Constant extends Class {
  __id = 123;
  __folder = "Constants";
  __ext = "k";

  base = field(Object);
  f_1 = field(U32);
}
