import { ClassCodec, field } from "../core";

import { V33 } from "./v33";

export class V84 extends ClassCodec {
  __id = 84;
  __todo = true;

  base = field(V33);
}
