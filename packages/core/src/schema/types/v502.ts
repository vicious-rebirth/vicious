import { ClassCodec, field } from "../core";

import { Named } from "./named";

export class V502 extends ClassCodec {
  __id = 502;
  __todo = true;

  base = field(Named);
}
