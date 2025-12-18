import { Class, field } from "../core";
import { Group } from "./group";

export class V222 extends Class {
  __id = 222;
  __offset = 0x1a330;

  base = field(Group);
}
