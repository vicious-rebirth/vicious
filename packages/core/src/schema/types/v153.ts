import { ClassCodec, field } from "../core";

import { Named } from "./named";

export class V153 extends ClassCodec {
  __id = 153;
  __todo = true;

  base = field(Named);
}
