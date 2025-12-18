import { Class, field } from "../core";
import { Action } from "./action";

export class V450 extends Class {
  __id = 450;
  __todo = true;
  __offset = 0x3ff70;

  base = field(Action);
}
