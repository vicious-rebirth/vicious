import { Class, field } from "../core";
import { Geom } from "./geom";

export class V402 extends Class {
  __id = 402;
  __todo = true;
  __offset = 0x298c0;

  base = field(Geom);
}
