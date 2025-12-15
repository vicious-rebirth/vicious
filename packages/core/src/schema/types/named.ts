import { Class, field } from "../core";

import { Base } from "./base";
import { Label } from "./label";

export class Named extends Class {
  __id = 2;
  __offset = 0xc9520;

  base = field(Base);
  label = field(Label);
}
