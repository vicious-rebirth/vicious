import { ClassCodec, field } from "../core";

import { Group } from "./group";

export class V412 extends ClassCodec {
  __id = 412;

  base = field(Group);
}
