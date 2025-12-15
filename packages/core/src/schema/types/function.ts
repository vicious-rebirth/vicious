import { Class, field } from "../core";

import { Group } from "./group";
import { Object } from "./object";
import { Script } from "./script";

export class FunctionGroup extends Class {
  __id = 117;

  base = field(Group);
}

export class Function extends Class {
  __id = 116;
  __folder = "Functions";
  __ext = "fn";

  base = field(Object);
  script = field(Script);
}
