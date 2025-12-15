import { Class, field } from "../core";

import { Base } from "./base";
import { Script } from "./script";

export class V419 extends Class {
  __id = 419;

  base = field(Base);
  onStarted = field(Script);
  onUpdated = field(Script);
  onCompleted = field(Script);
  onStopped = field(Script);
}
