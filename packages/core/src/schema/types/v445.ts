import { Class, field } from "../core";
import { Action } from "./action";

export class V445 extends Class {
  __id = 445;
  __todo = true;
  __offset = 0x4b640;

  base = field(Action);
}
