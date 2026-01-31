import { Class, field } from "../core";
import { F32 } from "./atomic";
import { Group } from "./group";
import { Object } from "./object";

export class VariableGroup extends Class {
  __id = 122;
  __offset = 0x1a330;

  base = field(Group);
}

export class Variable extends Class {
  __id = 121;
  __folder = "Variables";
  __ext = "kv";
  __offset = 0x1d710;

  base = field(Object);
  value = field(F32);
}
