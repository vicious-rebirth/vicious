import { Class, field } from "../core";

import { Action } from "./action";

export class V180 extends Class {
  __id = 180;
  __todo = true;

  base = field(Action);
}
