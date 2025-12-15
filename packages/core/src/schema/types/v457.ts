import { Class, field } from "../core";

import { U32 } from "./atomic";
import { V108 } from "./v108";
import { V301 } from "./v301";

export class V457 extends Class {
  __id = 457;

  base = field(V108);
  v301 = field(V301);
  f_0x30 = field(U32);
}
