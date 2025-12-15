import { ClassCodec, field } from "../core";

import { StaticLight } from "./staticLight";

export class V75 extends ClassCodec {
  __id = 75;

  base = field(StaticLight);
}
