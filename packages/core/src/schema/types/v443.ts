import { ClassCodec, field } from "../core";

import { V380 } from "./v380";

export class V443 extends ClassCodec {
  __id = 443;
  __todo = true;

  base = field(V380);
}
