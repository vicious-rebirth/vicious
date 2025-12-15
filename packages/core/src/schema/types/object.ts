import { Class, field } from "../core";

import { Named } from "./named";

export class Object extends Class {
  __id = 3;
  __offset = 0xc9600;

  base = field(Named);
}
