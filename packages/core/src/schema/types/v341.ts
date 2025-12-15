import { ClassCodec, field } from "../core";

import { V108 } from "./v108";
import { V421 } from "./v421";

export class V341 extends ClassCodec {
  __id = 341;

  base = field(V108);
  v421 = field(V421);
}
