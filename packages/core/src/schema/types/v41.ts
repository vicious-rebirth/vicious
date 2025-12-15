import { ClassCodec, field } from "../core";

import { MaterialSet } from "./materialSet";

export class V41 extends ClassCodec {
  __id = 41;
  __todo = true;

  base = field(MaterialSet);
}
