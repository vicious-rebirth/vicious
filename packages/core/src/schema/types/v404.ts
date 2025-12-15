import { ClassCodec, field } from "../core";

import { V403 } from "./v403";

export class V404 extends ClassCodec {
  __id = 404;
  __todo = true;

  base = field(V403);
}
