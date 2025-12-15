import { ClassCodec, field } from "../core";

import { GeomTemplate } from "./geomTemplate";

export class V33 extends ClassCodec {
  __id = 33;

  base = field(GeomTemplate);
}
