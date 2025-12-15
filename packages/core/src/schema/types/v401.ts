import { ClassCodec, field } from "../core";

import { GeomTemplate } from "./geomTemplate";

export class V401 extends ClassCodec {
  __id = 401;
  __todo = true;

  base = field(GeomTemplate);
}
