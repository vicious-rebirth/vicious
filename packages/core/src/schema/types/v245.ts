import { Class, field } from "../core";
import { Action } from "./action";

export class V245 extends Class {
  __id = 245;
  __offset = 0x22600;

  base = field(Action);
}
