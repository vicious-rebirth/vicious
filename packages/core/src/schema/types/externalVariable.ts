import { Class, field } from "../core";
import { U32 } from "./atomic";
import { Group } from "./group";
import { Object } from "./object";

export class ExternalVariableGroup extends Class {
  __id = 359;
  __offset = 0x1a330;

  base = field(Group);
}

export class ExternalVariable extends Class {
  __id = 357;
  __folder = "ExternalVariables";
  __ext = "ekv";
  __offset = 0x1d710;

  base = field(Object);
  f_1 = field(U32);
}
