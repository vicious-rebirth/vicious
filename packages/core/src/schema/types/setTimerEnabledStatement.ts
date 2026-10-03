import { Class, field } from "../core";
import { BOOL } from "./atomic";
import { Statement } from "./statement";
import { TimerSelector } from "./timerSelector";

export class SetTimerEnabledStatement extends Class {
  __id = 223;
  __offset = 0x24db0;

  base = field(Statement);
  timer = field(TimerSelector);
  enabled = field(BOOL);
  resetElapsedTime = field(BOOL);
}
