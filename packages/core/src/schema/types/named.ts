import { ClassCodec, field } from "../core";

import { Base } from "./base";
import { Label } from "./label";

export class Named extends ClassCodec {
  __id = 2;

  base = field(Base);
  label = field(Label);
}
