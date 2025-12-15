import { ClassCodec, field } from "../core";

import { V18 } from "./v18";

export class V403 extends ClassCodec {
  __id = 403;
  __todo = true;

  base = field(V18);
}
