import { Class, field } from "../core";
import { BOOL, U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { Vector3 } from "./math";
import { Statement } from "./statement";

export class V393 extends Class {
  __id = 393;
  __offset = 0x41250;

  base = field(Statement);
  v301 = field(EntitySelector);
  f_0x34 = field(Vector3);
  f_0x40 = field(U32);
  f_0x44 = field(BOOL);
}
