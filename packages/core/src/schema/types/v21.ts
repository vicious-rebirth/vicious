import { Class, field } from "../core";
import { Material } from "./material";

export class V21 extends Class {
  __id = 21;
  __todo = true;
  __offset = 0xdba80;

  base = field(Material);
}
