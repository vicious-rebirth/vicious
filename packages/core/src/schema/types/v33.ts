import { Class, field } from "../core";

import { GeomTemplate } from "./geomTemplate";

export class V33 extends Class {
  __id = 33;

  base = field(GeomTemplate);
}
