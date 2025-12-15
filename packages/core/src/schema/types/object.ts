import { Class, field } from "../core";

import { Named } from "./named";

export class Object extends Class {
  __id = 3;

  base = field(Named);
}
