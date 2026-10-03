import { Class, field } from "../core";
import { U32 } from "./atomic";
import { Statement } from "./statement";

export class XboxSystemStatement extends Class {
  __id = 479;
  __offset = 0x22870;

  base = field(Statement);
  operation = field(U32);
}
