import { ClassCodec, field } from "../core";

import { U32 } from "./atomic";
import { Base } from "./base";
import { Script } from "./script";

export class V377 extends ClassCodec {
  __id = 377;

  base = field(Base);
  f_0x04 = field(U32);
  onAnimate = field(Script);
}
