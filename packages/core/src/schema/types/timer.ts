import { Class, field } from "../core";
import { U32 } from "./atomic";
import { Object } from "./object";
import { Script } from "./script";

export class Timer extends Class {
  __id = 221;
  __folder = "Timers";
  __ext = "tim";
  __offset = 0x2f4f0;

  base = field(Object);
  flags = field(U32);
  duration = field(U32);
  onStarted = field(Script);
  onUpdated = field(Script);
  onStopped = field(Script);
  onCompleted = field(Script);
}
