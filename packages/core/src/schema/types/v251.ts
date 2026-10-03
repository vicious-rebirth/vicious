import { Class, field } from "../core";
import { BOOL } from "./atomic";
import { Statement } from "./statement";
import { TriggerSelector } from "./triggerSelector";

export class V251 extends Class {
  __id = 251;
  __offset = 0x24e80;

  base = field(Statement);
  f_0x08 = field(TriggerSelector);
  f_0x1c = field(BOOL);
}
