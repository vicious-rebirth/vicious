import { Class, field } from "../core";
import { BOOL } from "./atomic";
import { Label } from "./label";
import { Statement } from "./statement";

export class V338 extends Class {
  __id = 338;
  __offset = 0x23f20;

  base = field(Statement);
  f_1 = field(Label);
  f_0x20 = field(BOOL);
}
