import { ClassCodec, field } from "../core";

import { Named } from "./named";

export class Object extends ClassCodec {
  __id = 3;

  base = field(Named);
}
