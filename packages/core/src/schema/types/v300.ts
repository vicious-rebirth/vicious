import { Class, field } from "../core";

import { Base } from "./base";

export class V300 extends Class {
  __id = 300;

  base = field(Base);
}
