import { ClassCodec, field } from "../core";

import { Base } from "./base";
import { Script } from "./script";

export class V419 extends ClassCodec {
  __id = 419;

  base = field(Base);
  onStarted = field(Script);
  onUpdated = field(Script);
  onCompleted = field(Script);
  onStopped = field(Script);
}
