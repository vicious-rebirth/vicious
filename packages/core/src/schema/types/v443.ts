import { Class, field } from "../core";

import { V380 } from "./v380";

export class V443 extends Class {
  __id = 443;
  __todo = true;
  __offset = 0x62760;

  base = field(V380);
}
