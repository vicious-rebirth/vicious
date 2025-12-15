import { ClassCodec, field } from "../core";

import { Material } from "./material";

export class V21 extends ClassCodec {
  __id = 21;
  __todo = true;

  base = field(Material);
}
