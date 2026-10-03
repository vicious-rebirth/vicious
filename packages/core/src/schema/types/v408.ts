import { Class, field } from "../core";
import { Statement } from "./statement";

export class V408 extends Class {
  __id = 408;
  __todo = true;
  __offset = 0x3f050;

  base = field(Statement);
}
