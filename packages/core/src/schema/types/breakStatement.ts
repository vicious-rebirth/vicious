import { Class, field } from "../core";
import { Statement } from "./statement";

export class BreakStatement extends Class {
  __id = 245;
  __offset = 0x22600;

  base = field(Statement);
}
