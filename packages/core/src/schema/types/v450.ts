import { Class, field } from "../core";
import { Statement } from "./statement";

export class V450 extends Class {
  __id = 450;
  __todo = true;
  __offset = 0x3ff70;

  base = field(Statement);
}
