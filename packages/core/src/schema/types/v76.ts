import { ClassCodec, field } from "../core";

import { F32 } from "./atomic";
import { StaticLight } from "./staticLight";

export class V76 extends ClassCodec {
  __id = 76;

  base = field(StaticLight);
  f_0x7c = field(F32);
}
