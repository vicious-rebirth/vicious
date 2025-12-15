import { Class, field } from "../core";

import { GeomTemplate } from "./geomTemplate";

export class V33 extends Class {
  __id = 33;
  __offset = 0xd9700;

  base = field(GeomTemplate);
}
