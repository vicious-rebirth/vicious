import { Class, field } from "../core";
import { U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { ValueExpression } from "./valueExpression";

export class V164 extends Class {
  __id = 164;
  __offset = 0x599f0;

  base = field(ValueExpression);
  f_1 = field(EntitySelector);
  f_0x30 = field(U32);
  f_0x34 = field(U32);
}
