import { Class, field } from "../core";
import { Statement } from "./statement";
import { V421 } from "./v421";

export class V340 extends Class {
  __id = 340;
  __offset = 0x494b0;

  base = field(Statement);
  f_0x08 = field(V421);
}
