import { Class, field } from "../core";
import { Color } from "./math";
import { V18 } from "./v18";

export class V50 extends Class {
  __id = 50;
  __offset = 0x111470;

  base = field(V18);
  tint = field(Color);
}
