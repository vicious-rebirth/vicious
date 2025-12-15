import { Class, field } from "../core";

import { Group } from "./group";
import { Object } from "./object";
import { Script } from "./script";

export class FunctionGroup extends Class {
  __id = 117;
  __offset = 0x1a330;

  base = field(Group);
}

export class Function extends Class {
  __id = 116;
  __folder = "Functions";
  __ext = "fn";
  __offset = 0x284c0;

  base = field(Object);
  script = field(Script);
}
