import { Class, field } from "../core";
import { Base } from "./base";

export class Geom extends Class {
  __id = 22;
  __offset = 0x1a410;

  base = field(Base);
}
