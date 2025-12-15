import { ClassCodec, field } from "../core";

import { U32 } from "./atomic";
import { Object } from "./object";
import { Script } from "./script";

export class Timer extends ClassCodec {
  __id = 221;
  __folder = "Timers";
  __ext = "tim";

  base = field(Object);
  f_0xb0 = field(U32);
  f_0xb8 = field(U32);
  onStarted = field(Script);
  onUpdated = field(Script);
  onStopped = field(Script);
  onCompleted = field(Script);
}
