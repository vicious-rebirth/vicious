import { ClassCodec, field } from "../core";

import { Group } from "./group";

export class V222 extends ClassCodec {
  __id = 222;

  base = field(Group);
}
