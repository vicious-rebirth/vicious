import { ClassCodec, field } from "../core";

import { MaterialSet } from "./materialSet";

export class MaterialSetImpl extends ClassCodec {
  __id = 37;

  base = field(MaterialSet);
}
