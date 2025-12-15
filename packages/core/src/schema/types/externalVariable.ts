import { ClassCodec, field } from "../core";

import { U32 } from "./atomic";
import { Group } from "./group";
import { Object } from "./object";

export class ExternalVariableGroup extends ClassCodec {
  __id = 359;

  base = field(Group);
}

export class ExternalVariable extends ClassCodec {
  __id = 357;
  __folder = "External Variables";
  __ext = "ekv";

  base = field(Object);
  f_1 = field(U32);
}
