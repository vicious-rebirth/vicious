import { Class, field } from "../core";
import { World } from "./world";

export class Region extends Class {
  __id = 102;
  __folder = "Regions";
  __ext = "rgn";
  __offset = 0xbb7f0;
  __todo = true;

  base = field(World);
}
