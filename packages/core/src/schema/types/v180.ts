import { Class, field } from "../core";
import { Action } from "./action";

export class V180 extends Class {
  __id = 180;
  __todo = true;
  __offset = 0x47d80;

  base = field(Action);
}
