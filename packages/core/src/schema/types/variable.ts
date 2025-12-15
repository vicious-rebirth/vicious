import { ClassCodec, field } from "../core";

import { U32 } from "./atomic";
import { Group } from "./group";
import { Object } from "./object";

export class VariableGroup extends ClassCodec {
  __id = 122;

  base = field(Group);
}

export class Variable extends ClassCodec {
  __id = 121;
  __folder = "Variables";
  __ext = "kv";

  base = field(Object);
  f_1 = field(U32);
}
