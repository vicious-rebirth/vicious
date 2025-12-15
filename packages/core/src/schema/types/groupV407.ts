import { ClassCodec, field } from "../core";

import { Group } from "./group";

export class V407 extends ClassCodec {
  __id = 407;

  base = field(Group);
}
